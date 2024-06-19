import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createUserDto.password_hash,
      saltRounds,
    );

    const createdUser = new this.userModel({
      ...createUserDto,
      password_hash: hashedPassword,
    });

    return createdUser.save();
  }

  async findAll(page: number = 1, pageSize: number = 10): Promise<any> {
    const skip = (page - 1) * pageSize;
    const totalElements = await this.userModel.countDocuments().exec();
    const users = await this.userModel
      .find()
      .skip(skip)
      .limit(pageSize)
      .lean()
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

  async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).lean().exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).lean().exec();
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<{ message: string; user: User }> {
    const updateData: any = { ...updateUserDto };

    if (updateUserDto.password_hash) {
      const saltRounds = 10;
      updateData.password_hash = await bcrypt.hash(
        updateUserDto.password_hash,
        saltRounds,
      );
    }

    const existingUser = await this.userModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .lean()
      .exec();

    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return {
      message: 'El registro ha sido actualizado con éxito',
      user: existingUser,
    };
  }

  async delete(id: string): Promise<{ message: string; user: User }> {
    const deletedUser = await this.userModel
      .findByIdAndDelete(id)
      .lean()
      .exec();

    if (!deletedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return {
      message: 'El registro ha sido eliminado con éxito',
      user: deletedUser,
    };
  }
}
