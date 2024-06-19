import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client, ClientDocument } from './schema/client.schema';

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel(Client.name) private clientModel: Model<ClientDocument>,
  ) {}

  private async isEmailTaken(email: string): Promise<boolean> {
    const client = await this.clientModel.findOne({ email }).exec();
    return !!client;
  }

  async create(createClientDto: CreateClientDto): Promise<Client> {
    const emailTaken = await this.isEmailTaken(createClientDto.email);
    if (emailTaken) {
      throw new BadRequestException('Email is already taken');
    }

    const createdClient = new this.clientModel(createClientDto);
    return createdClient.save();
  }

  async findAll(page: number = 1, pageSize: number = 10): Promise<any> {
    const skip = (page - 1) * pageSize;
    const totalElements = await this.clientModel.countDocuments().exec();
    const clients = await this.clientModel
      .find()
      .skip(skip)
      .limit(pageSize)
      .exec();

    return {
      list: clients,
      pageNumber: page,
      pageSize: pageSize,
      totalElements: totalElements,
      totalPages: Math.ceil(totalElements / pageSize),
      isLast: page * pageSize >= totalElements,
    };
  }

  async findById(id: string): Promise<Client> {
    const client = await this.clientModel.findById(id).exec();
    if (!client) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }
    return client;
  }

  async update(id: string, updateClientDto: UpdateClientDto): Promise<Client> {
    const existingClient = await this.clientModel
      .findByIdAndUpdate(id, updateClientDto, { new: true })
      .exec();
    if (!existingClient) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }
    return existingClient;
  }

  async delete(id: string): Promise<Client> {
    const deletedClient = await this.clientModel.findByIdAndDelete(id).exec();
    if (!deletedClient) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }
    return deletedClient;
  }
}
