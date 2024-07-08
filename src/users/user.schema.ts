import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  IsEnum,
  IsEmail,
  IsDate,
  IsString,
  IsArray,
  IsNumber,
} from 'class-validator';

export type UserDocument = User & Document;

export enum Role {
  Doctor = 'Doctor',
  Paciente = 'Paciente',
  Admin = 'Admin',
}

export enum CivilStatus {
  Soltero = 'Soltero',
  Casado = 'Casado',
  Otro = 'Otro',
}

@Schema()
export class Address {
  @Prop({ required: true })
  @IsString()
  street: string;

  @Prop({ required: true })
  @IsString()
  city: string;

  @Prop({ required: true })
  @IsString()
  state: string;

  @Prop({ required: true })
  @IsString()
  zip: string;

  @Prop({ required: true })
  @IsString()
  country: string;
}

@Schema()
export class Specialization {
  @Prop({ required: true })
  @IsString()
  name: string;

  @Prop({ required: true })
  @IsNumber()
  year: number;
}

@Schema()
export class Degree {
  @Prop({ required: true })
  @IsString()
  institution: string;

  @Prop({ required: true })
  @IsString()
  degree: string;

  @Prop({ required: true })
  @IsNumber()
  year: number;
}

@Schema()
export class Certification {
  @Prop({ required: true })
  @IsString()
  name: string;

  @Prop({ required: true })
  @IsString()
  institution: string;

  @Prop({ required: true })
  @IsNumber()
  year: number;
}

@Schema()
export class Experience {
  @Prop({ required: true })
  @IsString()
  companyName: string;

  @Prop({ required: true })
  @IsString()
  role: string;

  @Prop({ required: true })
  @IsString()
  duration: string;

  @Prop({ required: true })
  @IsString()
  description: string;
}

@Schema()
export class PublishedArticle {
  @Prop({ required: true })
  @IsString()
  title: string;

  @Prop({ required: true })
  @IsString()
  journal: string;

  @Prop({ required: true })
  @IsDate()
  date: Date;
}

@Schema()
export class OngoingResearch {
  @Prop({ required: true })
  @IsString()
  title: string;

  @Prop({ required: true })
  @IsString()
  description: string;

  @Prop({ required: true })
  @IsDate()
  startDate: Date;
}

@Schema()
export class Association {
  @Prop({ required: true })
  @IsString()
  name: string;

  @Prop({ required: true })
  @IsString()
  role: string;

  @Prop({ required: true })
  @IsString()
  duration: string;
}

@Schema()
export class Conference {
  @Prop({ required: true })
  @IsString()
  name: string;

  @Prop({ required: true })
  @IsString()
  location: string;

  @Prop({ required: true })
  @IsDate()
  date: Date;
}

@Schema()
export class Workshop {
  @Prop({ required: true })
  @IsString()
  name: string;

  @Prop({ required: true })
  @IsString()
  location: string;

  @Prop({ required: true })
  @IsDate()
  date: Date;

  @Prop({ required: true })
  @IsString()
  description: string;
}

@Schema()
export class Availability {
  @Prop({ required: true })
  @IsString()
  day: string;

  @Prop({ required: true })
  @IsString()
  time: string;
}

@Schema()
export class Reference {
  @Prop({ required: true })
  @IsString()
  name: string;

  @Prop({ required: true })
  @IsString()
  position: string;

  @Prop({ required: true })
  @IsString()
  contact: string;
}

@Schema()
export class Skill {
  @Prop({ required: true })
  @IsString()
  description: string;
}

@Schema()
export class EventHistory {
  @Prop({ required: true })
  @IsDate()
  date: Date;

  @Prop({ required: true })
  @IsString()
  eventDescription: string;
}

@Schema()
export class User {
  @Prop({ required: true })
  @IsString()
  firstName: string;

  @Prop({ required: true })
  @IsString()
  lastName: string;

  @Prop({ required: true })
  @IsDate()
  dateOfBirth: Date;

  @Prop({ required: true })
  @IsString()
  phoneNumber: string;

  @Prop({ required: false })
  @IsString()
  profilePic: string;

  @Prop({ required: true, unique: true })
  @IsEmail()
  email: string;

  @Prop({ required: true })
  @IsString()
  password: string;

  @Prop({ required: true })
  @IsString()
  dni: string;

  @Prop({ required: true, enum: Role })
  @IsEnum(Role)
  role: Role;

  @Prop({ required: true })
  @IsDate()
  registrationDate: Date;

  @Prop({ required: true })
  @IsArray()
  address: Address[];

  @Prop({ required: true, enum: CivilStatus })
  @IsEnum(CivilStatus)
  civilStatus: CivilStatus;

  @Prop({ required: true })
  @IsString()
  nationality: string;

  @Prop({ required: true })
  @IsString()
  licenseNumber: string;

  @Prop({ required: true })
  @IsArray()
  specialization: Specialization[];

  @Prop({ required: true })
  @IsNumber()
  yearsOfExperience: number;

  @Prop({ required: true })
  @IsArray()
  degree: Degree[];

  @Prop({ required: true })
  @IsArray()
  postgraduate: Degree[];

  @Prop({ required: true })
  @IsArray()
  doctorate: Degree[];

  @Prop({ required: true })
  @IsArray()
  certifications: Certification[];

  @Prop({ required: true })
  @IsArray()
  areasOfInterest: Skill[];

  @Prop({ required: true })
  @IsArray()
  languages: Skill[];

  @Prop({ required: true })
  @IsArray()
  workExperience: Experience[];

  @Prop({ required: true })
  @IsArray()
  featuredProjects: Experience[];

  @Prop({ required: true })
  @IsArray()
  publishedArticles: PublishedArticle[];

  @Prop({ required: true })
  @IsArray()
  ongoingResearch: OngoingResearch[];

  @Prop({ required: true })
  @IsArray()
  professionalAssociations: Association[];

  @Prop({ required: true })
  @IsArray()
  conferencesAndSeminars: Conference[];

  @Prop({ required: true })
  @IsArray()
  workshopsAndLectures: Workshop[];

  @Prop({ required: true })
  @IsArray()
  availability: Availability[];

  @Prop({ required: true })
  @IsArray()
  references: Reference[];

  @Prop({ required: true })
  @IsArray()
  technicalSkills: Skill[];

  @Prop({ required: true })
  @IsArray()
  interpersonalSkills: Skill[];

  @Prop({ required: true })
  @IsArray()
  additionalNotes: Skill[];

  @Prop({ required: true })
  @IsArray()
  eventHistory: EventHistory[];
}

export const UserSchema = SchemaFactory.createForClass(User);
