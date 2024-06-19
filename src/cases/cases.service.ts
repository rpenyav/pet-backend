import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCaseDto } from './dto/create-case.dto';
import { UpdateCaseDto } from './dto/update-case.dto';
import { Case, CaseDocument } from './schema/case.schema';

@Injectable()
export class CasesService {
  constructor(@InjectModel(Case.name) private caseModel: Model<CaseDocument>) {}

  async create(createCaseDto: CreateCaseDto): Promise<Case> {
    const createdCase = new this.caseModel(createCaseDto);
    return createdCase.save();
  }

  async findAll(page: number = 1, pageSize: number = 10): Promise<any> {
    const skip = (page - 1) * pageSize;
    const totalElements = await this.caseModel.countDocuments().exec();
    const cases = await this.caseModel.find().skip(skip).limit(pageSize).exec();

    return {
      list: cases,
      pageNumber: page,
      pageSize: pageSize,
      totalElements: totalElements,
      totalPages: Math.ceil(totalElements / pageSize),
      isLast: page * pageSize >= totalElements,
    };
  }

  async findById(id: string): Promise<Case> {
    const caseData = await this.caseModel.findById(id).exec();
    if (!caseData) {
      throw new NotFoundException(`Case with ID ${id} not found`);
    }
    return caseData;
  }

  async update(id: string, updateCaseDto: UpdateCaseDto): Promise<Case> {
    const existingCase = await this.caseModel
      .findByIdAndUpdate(id, updateCaseDto, { new: true })
      .exec();
    if (!existingCase) {
      throw new NotFoundException(`Case with ID ${id} not found`);
    }
    return existingCase;
  }

  async delete(id: string): Promise<Case> {
    const deletedCase = await this.caseModel.findByIdAndDelete(id).exec();
    if (!deletedCase) {
      throw new NotFoundException(`Case with ID ${id} not found`);
    }
    return deletedCase;
  }
}
