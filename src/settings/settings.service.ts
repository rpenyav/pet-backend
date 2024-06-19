import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { Setting, SettingDocument } from './schema/settings.schema';

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel(Setting.name) private settingModel: Model<SettingDocument>,
  ) {}

  async create(createSettingDto: CreateSettingDto): Promise<Setting> {
    const existingSetting = await this.settingModel.findOne().exec();
    if (existingSetting) {
      throw new BadRequestException(
        'A setting already exists. You can only update the existing setting.',
      );
    }

    const createdSetting = new this.settingModel(createSettingDto);
    return createdSetting.save();
  }

  async findAll(): Promise<Setting[]> {
    return this.settingModel.find().exec();
  }

  async findById(id: string): Promise<Setting> {
    const setting = await this.settingModel.findById(id).exec();
    if (!setting) {
      throw new NotFoundException(`Setting with ID ${id} not found`);
    }
    return setting;
  }

  async find(): Promise<Setting> {
    const setting = await this.settingModel.findOne().exec();
    if (!setting) {
      throw new NotFoundException('Setting not found');
    }
    return setting;
  }

  async update(
    id: string,
    updateSettingDto: UpdateSettingDto,
  ): Promise<Setting> {
    const existingSetting = await this.settingModel
      .findByIdAndUpdate(id, updateSettingDto, { new: true })
      .exec();
    if (!existingSetting) {
      throw new NotFoundException(`Setting with ID ${id} not found`);
    }
    return existingSetting;
  }

  async delete(id: string): Promise<Setting> {
    const deletedSetting = await this.settingModel.findByIdAndDelete(id).exec();
    if (!deletedSetting) {
      throw new NotFoundException(`Setting with ID ${id} not found`);
    }
    return deletedSetting;
  }
}
