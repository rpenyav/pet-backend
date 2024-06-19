import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';
import {
  Consultation,
  ConsultationDocument,
} from './schema/consultation.schema';

@Injectable()
export class ConsultationsService {
  constructor(
    @InjectModel(Consultation.name)
    private consultationModel: Model<ConsultationDocument>,
  ) {}

  async create(
    createConsultationDto: CreateConsultationDto,
  ): Promise<Consultation> {
    const createdConsultation = new this.consultationModel(
      createConsultationDto,
    );
    return createdConsultation.save();
  }

  async findAll(page: number = 1, pageSize: number = 10): Promise<any> {
    const skip = (page - 1) * pageSize;
    const totalElements = await this.consultationModel.countDocuments().exec();
    const consultations = await this.consultationModel
      .find()
      .skip(skip)
      .limit(pageSize)
      .exec();

    return {
      list: consultations,
      pageNumber: page,
      pageSize: pageSize,
      totalElements: totalElements,
      totalPages: Math.ceil(totalElements / pageSize),
      isLast: page * pageSize >= totalElements,
    };
  }

  async findById(id: string): Promise<Consultation> {
    const consultation = await this.consultationModel.findById(id).exec();
    if (!consultation) {
      throw new NotFoundException(`Consultation with ID ${id} not found`);
    }
    return consultation;
  }

  async update(
    id: string,
    updateConsultationDto: UpdateConsultationDto,
  ): Promise<Consultation> {
    const existingConsultation = await this.consultationModel
      .findByIdAndUpdate(id, updateConsultationDto, { new: true })
      .exec();
    if (!existingConsultation) {
      throw new NotFoundException(`Consultation with ID ${id} not found`);
    }
    return existingConsultation;
  }

  async delete(id: string): Promise<Consultation> {
    const deletedConsultation = await this.consultationModel
      .findByIdAndDelete(id)
      .exec();
    if (!deletedConsultation) {
      throw new NotFoundException(`Consultation with ID ${id} not found`);
    }
    return deletedConsultation;
  }
}
