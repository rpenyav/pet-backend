import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Doctor, DoctorDocument } from './schema/doctor.schema';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectModel(Doctor.name) private doctorModel: Model<DoctorDocument>,
  ) {}

  private async isEmailTaken(email: string): Promise<boolean> {
    const doctor = await this.doctorModel.findOne({ contacto: email }).exec();
    return !!doctor;
  }

  async create(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    const emailTaken = await this.isEmailTaken(createDoctorDto.contacto);
    if (emailTaken) {
      throw new BadRequestException('Email is already taken');
    }

    const createdDoctor = new this.doctorModel(createDoctorDto);
    return createdDoctor.save();
  }

  async findAll(page: number = 1, pageSize: number = 10): Promise<any> {
    const skip = (page - 1) * pageSize;
    const totalElements = await this.doctorModel.countDocuments().exec();
    const doctors = await this.doctorModel
      .find()
      .skip(skip)
      .limit(pageSize)
      .exec();

    return {
      list: doctors,
      pageNumber: page,
      pageSize: pageSize,
      totalElements: totalElements,
      totalPages: Math.ceil(totalElements / pageSize),
      isLast: page * pageSize >= totalElements,
    };
  }

  async findById(id: string): Promise<Doctor> {
    const doctor = await this.doctorModel.findById(id).exec();
    if (!doctor) {
      throw new NotFoundException(`Doctor with ID ${id} not found`);
    }
    return doctor;
  }

  async update(id: string, updateDoctorDto: UpdateDoctorDto): Promise<Doctor> {
    const existingDoctor = await this.doctorModel
      .findByIdAndUpdate(id, updateDoctorDto, { new: true })
      .exec();
    if (!existingDoctor) {
      throw new NotFoundException(`Doctor with ID ${id} not found`);
    }
    return existingDoctor;
  }

  async delete(id: string): Promise<Doctor> {
    const deletedDoctor = await this.doctorModel.findByIdAndDelete(id).exec();
    if (!deletedDoctor) {
      throw new NotFoundException(`Doctor with ID ${id} not found`);
    }
    return deletedDoctor;
  }
}
