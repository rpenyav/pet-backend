import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, SortOrder, Types } from 'mongoose';
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
    sortBy?: string,
    sortOrder: 'asc' | 'desc' = 'asc',
  ): Promise<any> {
    const skip = (page - 1) * pageSize;
    const searchTerm = term ? term.toString() : '';

    const query = {
      $or: [
        { firstName: { $regex: new RegExp(searchTerm, 'i') } },
        { lastName: { $regex: new RegExp(searchTerm, 'i') } },
        { phoneNumber: { $regex: new RegExp(searchTerm, 'i') } },
        { email: { $regex: new RegExp(searchTerm, 'i') } },
        { dni: { $regex: new RegExp(searchTerm, 'i') } },
      ],
    };

    const totalElements = await this.userModel.countDocuments(query).exec();
    const sortOptions: [string, 1 | -1][] = sortBy
      ? [[sortBy, sortOrder === 'asc' ? 1 : -1]]
      : [];

    const users = await this.userModel
      .find(query)
      .skip(skip)
      .limit(pageSize)
      .sort(sortOptions)
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
        query[key] = { $elemMatch: this.buildQuery(searchDto[key][0]) };
      } else if (typeof searchDto[key] === 'string') {
        query[key] = { $regex: new RegExp(searchDto[key], 'i') };
      } else {
        query[key] = searchDto[key];
      }
    }
    return query;
  }

  async findAll(
    page: number,
    pageSize: number,
    sortBy?: string,
    sortOrder: 'asc' | 'desc' = 'asc',
  ) {
    const skip = (page - 1) * pageSize;
    const totalElements = await this.userModel.countDocuments().exec();
    const sortOptions: { [key: string]: SortOrder } = sortBy
      ? { [sortBy]: sortOrder === 'asc' ? 1 : -1 }
      : {};

    const users = await this.userModel
      .find()
      .skip(skip)
      .limit(pageSize)
      .sort(sortOptions)
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

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Verificar si el correo electrónico ya está en uso
    const existingUser = await this.userModel
      .findOne({ email: createUserDto.email })
      .exec();
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

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

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    // Verificar que cada elemento en los arrays tenga un _id
    user.specialization = user.specialization.map((item) => ({
      ...item,
      _id: item._id || new Types.ObjectId(),
    }));

    user.degree = user.degree.map((item) => ({
      ...item,
      _id: item._id || new Types.ObjectId(),
    }));

    user.postgraduate = user.postgraduate.map((item) => ({
      ...item,
      _id: item._id || new Types.ObjectId(),
    }));

    user.doctorate = user.doctorate.map((item) => ({
      ...item,
      _id: item._id || new Types.ObjectId(),
    }));

    user.certifications = user.certifications.map((item) => ({
      ...item,
      _id: item._id || new Types.ObjectId(),
    }));

    user.workExperience = user.workExperience.map((item) => ({
      ...item,
      _id: item._id || new Types.ObjectId(),
    }));

    user.publishedArticles = user.publishedArticles.map((item) => ({
      ...item,
      _id: item._id || new Types.ObjectId(),
    }));

    user.ongoingResearch = user.ongoingResearch.map((item) => ({
      ...item,
      _id: item._id || new Types.ObjectId(),
    }));

    user.address = user.address.map((item) => ({
      ...item,
      _id: item._id || new Types.ObjectId(),
    }));

    user.professionalAssociations = user.professionalAssociations.map(
      (item) => ({
        ...item,
        _id: item._id || new Types.ObjectId(),
      }),
    );

    user.conferencesAndSeminars = user.conferencesAndSeminars.map((item) => ({
      ...item,
      _id: item._id || new Types.ObjectId(),
    }));

    user.workshopsAndLectures = user.workshopsAndLectures.map((item) => ({
      ...item,
      _id: item._id || new Types.ObjectId(),
    }));

    user.availability = user.availability.map((item) => ({
      ...item,
      _id: item._id || new Types.ObjectId(),
    }));

    user.references = user.references.map((item) => ({
      ...item,
      _id: item._id || new Types.ObjectId(),
    }));

    user.technicalSkills = user.technicalSkills.map((item) => ({
      ...item,
      _id: item._id || new Types.ObjectId(),
    }));

    user.interpersonalSkills = user.interpersonalSkills.map((item) => ({
      ...item,
      _id: item._id || new Types.ObjectId(),
    }));

    user.additionalNotes = user.additionalNotes.map((item) => ({
      ...item,
      _id: item._id || new Types.ObjectId(),
    }));

    user.eventHistory = user.eventHistory.map((item) => ({
      ...item,
      _id: item._id || new Types.ObjectId(),
    }));

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

  // Método para agregar un nuevo elemento a un array dentro de un usuario
  async addArrayItem(
    userId: string,
    arrayName: string,
    newItem: any,
  ): Promise<User> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException(`User with ID "${userId}" not found`);
    }

    // Generar un nuevo ObjectId para el nuevo elemento si no tiene uno
    if (!newItem._id) {
      newItem._id = new Types.ObjectId();
    }

    // Agregar el nuevo elemento al array correspondiente
    user[arrayName].push(newItem);

    await user.save();
    return user;
  }

  // Método para actualizar un elemento dentro de un array
  async updateArrayItem(
    userId: string,
    arrayName: string,
    itemId: string,
    updateData: any,
  ): Promise<User> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException(`User with ID "${userId}" not found`);
    }

    // Buscar y actualizar el elemento dentro del array
    const arrayIndex = user[arrayName].findIndex(
      (item: any) => item._id.toString() === itemId,
    );
    if (arrayIndex === -1) {
      throw new NotFoundException(
        `Item with ID "${itemId}" not found in ${arrayName}`,
      );
    }

    // Actualizar el elemento específico en el array
    user[arrayName][arrayIndex] = {
      ...user[arrayName][arrayIndex],
      ...updateData,
    };

    await user.save();
    return user;
  }

  async removeArrayItem(
    userId: string,
    arrayName: string,
    itemId: string,
  ): Promise<User> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException(`User with ID "${userId}" not found`);
    }

    // Buscar y eliminar el elemento dentro del array
    user[arrayName] = user[arrayName].filter(
      (item: any) => item._id.toString() !== itemId,
    );

    // Verificar que cada elemento en los arrays tenga un _id después de la eliminación
    user.specialization = user.specialization.map((item) => ({
      ...item,
      _id: item._id || new Types.ObjectId(),
    }));

    user.degree = user.degree.map((item) => ({
      ...item,
      _id: item._id || new Types.ObjectId(),
    }));

    user.postgraduate = user.postgraduate.map((item) => ({
      ...item,
      _id: item._id || new Types.ObjectId(),
    }));

    user.doctorate = user.doctorate.map((item) => ({
      ...item,
      _id: item._id || new Types.ObjectId(),
    }));

    user.certifications = user.certifications.map((item) => ({
      ...item,
      _id: item._id || new Types.ObjectId(),
    }));

    user.workExperience = user.workExperience.map((item) => ({
      ...item,
      _id: item._id || new Types.ObjectId(),
    }));

    user.publishedArticles = user.publishedArticles.map((item) => ({
      ...item,
      _id: item._id || new Types.ObjectId(),
    }));

    user.ongoingResearch = user.ongoingResearch.map((item) => ({
      ...item,
      _id: item._id || new Types.ObjectId(),
    }));

    user.address = user.address.map((item) => ({
      ...item,
      _id: item._id || new Types.ObjectId(),
    }));

    user.professionalAssociations = user.professionalAssociations.map(
      (item) => ({
        ...item,
        _id: item._id || new Types.ObjectId(),
      }),
    );

    user.conferencesAndSeminars = user.conferencesAndSeminars.map((item) => ({
      ...item,
      _id: item._id || new Types.ObjectId(),
    }));

    user.workshopsAndLectures = user.workshopsAndLectures.map((item) => ({
      ...item,
      _id: item._id || new Types.ObjectId(),
    }));

    user.availability = user.availability.map((item) => ({
      ...item,
      _id: item._id || new Types.ObjectId(),
    }));

    user.references = user.references.map((item) => ({
      ...item,
      _id: item._id || new Types.ObjectId(),
    }));

    user.technicalSkills = user.technicalSkills.map((item) => ({
      ...item,
      _id: item._id || new Types.ObjectId(),
    }));

    user.interpersonalSkills = user.interpersonalSkills.map((item) => ({
      ...item,
      _id: item._id || new Types.ObjectId(),
    }));

    user.additionalNotes = user.additionalNotes.map((item) => ({
      ...item,
      _id: item._id || new Types.ObjectId(),
    }));

    user.eventHistory = user.eventHistory.map((item) => ({
      ...item,
      _id: item._id || new Types.ObjectId(),
    }));

    await user.save();
    return user;
  }
}
