import { PartialType } from '@nestjs/mapped-types';
import {
  IsString,
  IsEmail,
  IsEnum,
  IsDate,
  IsArray,
  IsNumber,
} from 'class-validator';
import { Address } from 'cluster';
import {
  Role,
  CivilStatus,
  Association,
  Availability,
  Certification,
  Conference,
  Degree,
  EventHistory,
  Experience,
  OngoingResearch,
  PublishedArticle,
  Reference,
  Skill,
  Specialization,
  Workshop,
} from './user.schema';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsDate()
  dateOfBirth: Date;

  @IsString()
  phoneNumber: string;

  @IsString()
  profilePic: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  dni: string;

  @IsEnum(Role)
  role: Role;

  @IsDate()
  registrationDate: Date;

  @IsArray()
  address: Address[];

  @IsEnum(CivilStatus)
  civilStatus: CivilStatus;

  @IsString()
  nationality: string;

  @IsString()
  licenseNumber: string;

  @IsArray()
  specialization: Specialization[];

  @IsNumber()
  yearsOfExperience: number;

  @IsArray()
  degree: Degree[];

  @IsArray()
  postgraduate: Degree[];

  @IsArray()
  doctorate: Degree[];

  @IsArray()
  certifications: Certification[];

  @IsArray()
  areasOfInterest: Skill[];

  @IsArray()
  languages: Skill[];

  @IsArray()
  workExperience: Experience[];

  @IsArray()
  featuredProjects: Experience[];

  @IsArray()
  publishedArticles: PublishedArticle[];

  @IsArray()
  ongoingResearch: OngoingResearch[];

  @IsArray()
  professionalAssociations: Association[];

  @IsArray()
  conferencesAndSeminars: Conference[];

  @IsArray()
  workshopsAndLectures: Workshop[];

  @IsArray()
  availability: Availability[];

  @IsArray()
  references: Reference[];

  @IsArray()
  technicalSkills: Skill[];

  @IsArray()
  interpersonalSkills: Skill[];

  @IsArray()
  additionalNotes: Skill[];

  @IsArray()
  eventHistory: EventHistory[];
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
