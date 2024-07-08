import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from './user.schema';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async search(searchDto: any): Promise<User[]> {
    const query = this.buildQuery(searchDto);
    const users = await this.userModel.find(query).exec();
    if (!users || users.length === 0) {
      throw new NotFoundException('No users found with the specified criteria');
    }
    return users;
  }

  async filterUsers(
    term: string,
    page: number,
    pageSize: number,
  ): Promise<any> {
    const skip = (page - 1) * pageSize;
    // Asegúrate de que term sea una cadena de texto
    const searchTerm = term ? term.toString() : '';

    const query = {
      $or: [
        { firstName: { $regex: searchTerm, $options: 'i' } },
        { lastName: { $regex: searchTerm, $options: 'i' } },
        { phoneNumber: { $regex: searchTerm, $options: 'i' } },
        { email: { $regex: searchTerm, $options: 'i' } },
        { dni: { $regex: searchTerm, $options: 'i' } },
      ],
    };

    const totalElements = await this.userModel.countDocuments(query).exec();
    const users = await this.userModel
      .find(query, {
        firstName: 1,
        lastName: 1,
        dateOfBirth: 1,
        phoneNumber: 1,
        email: 1,
        dni: 1,
        registrationDate: 1,
      })
      .skip(skip)
      .limit(pageSize)
      .exec();

    return {
      list: users,
      pageNumber: page,
      pageSize: pageSize,
      totalElements: totalElements,
      totalPages: Math.ceil(totalElements / pageSize),
      isLast: page * pageSize >= totalElements,
    };
  }

  buildQuery(searchDto: any): any {
    const query = {};
    for (const key in searchDto) {
      if (Array.isArray(searchDto[key])) {
        query[key] = { $elemMatch: searchDto[key][0] };
      } else {
        query[key] = searchDto[key];
      }
    }
    return query;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltRounds,
    );
    const createdUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });
    return createdUser.save();
  }

  async findAll(page: number, pageSize: number) {
    const skip = (page - 1) * pageSize;
    const totalElements = await this.userModel.countDocuments().exec();
    const users = await this.userModel.find().skip(skip).limit(pageSize).exec();

    return {
      list: users,
      pageNumber: page,
      pageSize: pageSize,
      totalElements: totalElements,
      totalPages: Math.ceil(totalElements / pageSize),
      isLast: page * pageSize >= totalElements,
    };
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    if (updateUserDto.password) {
      const saltRounds = 10;
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        saltRounds,
      );
    }
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
    if (!updatedUser) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return updatedUser;
  }

  async remove(id: string): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
    if (!deletedUser) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return deletedUser;
  }

  async login(email: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = {
      email: user.email as string,
      sub: user._id as string,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async renew(token: string): Promise<any> {
    const decoded = this.jwtService.verify(token);
    const payload: JwtPayload = { email: decoded.email, sub: decoded.sub };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }
}
