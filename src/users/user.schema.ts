// user.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
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
  Cliente = 'Cliente',
  Admin = 'Admin',
}

export enum CivilStatus {
  Soltero = 'Soltero',
  Casado = 'Casado',
  Otro = 'Otro',
}

@Schema()
export class Address {
  @Prop({ type: Types.ObjectId, auto: true })
  _id: Types.ObjectId;

  @Prop({ required: false })
  @IsString()
  street: string;

  @Prop({ required: false })
  @IsString()
  city: string;

  @Prop({ required: false })
  @IsString()
  state: string;

  @Prop({ required: false })
  @IsString()
  zip: string;

  @Prop({ required: false })
  @IsString()
  country: string;
}

@Schema()
export class Specialization {
  @Prop({ type: Types.ObjectId, auto: true })
  _id: Types.ObjectId;

  @Prop({ required: false })
  @IsString()
  name: string;

  @Prop({ required: false })
  @IsNumber()
  year: number;
}

@Schema()
export class Degree {
  @Prop({ type: Types.ObjectId, auto: true })
  _id: Types.ObjectId;

  @Prop({ required: false })
  @IsString()
  institution: string;

  @Prop({ required: false })
  @IsString()
  degree: string;

  @Prop({ required: false })
  @IsNumber()
  year: number;
}

@Schema()
export class Certification {
  @Prop({ type: Types.ObjectId, auto: true })
  _id: Types.ObjectId;

  @Prop({ required: false })
  @IsString()
  name: string;

  @Prop({ required: false })
  @IsString()
  institution: string;

  @Prop({ required: false })
  @IsNumber()
  year: number;
}

@Schema()
export class Experience {
  @Prop({ type: Types.ObjectId, auto: true })
  _id: Types.ObjectId;

  @Prop({ required: false })
  @IsString()
  companyName: string;

  @Prop({ required: false })
  @IsString()
  role: string;

  @Prop({ required: false })
  @IsString()
  duration: string;

  @Prop({ required: false })
  @IsString()
  description: string;
}

@Schema()
export class PublishedArticle {
  @Prop({ type: Types.ObjectId, auto: true })
  _id: Types.ObjectId;

  @Prop({ required: false })
  @IsString()
  title: string;

  @Prop({ required: false })
  @IsString()
  journal: string;

  @Prop({ required: false })
  @IsDate()
  date: Date;
}

@Schema()
export class OngoingResearch {
  @Prop({ type: Types.ObjectId, auto: true })
  _id: Types.ObjectId;

  @Prop({ required: false })
  @IsString()
  title: string;

  @Prop({ required: false })
  @IsString()
  description: string;

  @Prop({ required: false })
  @IsDate()
  startDate: Date;
}

@Schema()
export class Association {
  @Prop({ type: Types.ObjectId, auto: true })
  _id: Types.ObjectId;

  @Prop({ required: false })
  @IsString()
  name: string;

  @Prop({ required: false })
  @IsString()
  role: string;

  @Prop({ required: false })
  @IsString()
  duration: string;
}

@Schema()
export class Conference {
  @Prop({ type: Types.ObjectId, auto: true })
  _id: Types.ObjectId;

  @Prop({ required: false })
  @IsString()
  name: string;

  @Prop({ required: false })
  @IsString()
  location: string;

  @Prop({ required: false })
  @IsDate()
  date: Date;
}

@Schema()
export class Workshop {
  @Prop({ type: Types.ObjectId, auto: true })
  _id: Types.ObjectId;

  @Prop({ required: false })
  @IsString()
  name: string;

  @Prop({ required: false })
  @IsString()
  location: string;

  @Prop({ required: false })
  @IsDate()
  date: Date;

  @Prop({ required: false })
  @IsString()
  description: string;
}

@Schema()
export class Availability {
  @Prop({ type: Types.ObjectId, auto: true })
  _id: Types.ObjectId;

  @Prop({ required: false })
  @IsString()
  day: string;

  @Prop({ required: false })
  @IsString()
  time: string;
}

@Schema()
export class Reference {
  @Prop({ type: Types.ObjectId, auto: true })
  _id: Types.ObjectId;

  @Prop({ required: false })
  @IsString()
  name: string;

  @Prop({ required: false })
  @IsString()
  position: string;

  @Prop({ required: false })
  @IsString()
  contact: string;
}

@Schema()
export class Skill {
  @Prop({ type: Types.ObjectId, auto: true })
  _id: Types.ObjectId;

  @Prop({ required: false })
  @IsString()
  description: string;
}

@Schema()
export class EventHistory {
  @Prop({ type: Types.ObjectId, auto: true })
  _id: Types.ObjectId;

  @Prop({ required: false })
  @IsDate()
  date: Date;

  @Prop({ required: false })
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

  @Prop({ required: false, enum: Role })
  @IsEnum(Role)
  role: Role;

  @Prop({ required: true })
  @IsDate()
  registrationDate: Date;

  @Prop({ required: false, type: [Address] })
  @IsArray()
  address: Address[];

  @Prop({ required: false, enum: CivilStatus })
  @IsEnum(CivilStatus)
  civilStatus: CivilStatus;

  @Prop({ required: false })
  @IsString()
  nationality: string;

  @Prop({ required: false })
  @IsString()
  licenseNumber: string;

  @Prop({ required: false, type: [Specialization] })
  @IsArray()
  specialization: Specialization[];

  @Prop({ required: false })
  @IsNumber()
  yearsOfExperience: number;

  @Prop({ required: false, type: [Degree] })
  @IsArray()
  degree: Degree[];

  @Prop({ required: false, type: [Degree] })
  @IsArray()
  postgraduate: Degree[];

  @Prop({ required: false, type: [Degree] })
  @IsArray()
  doctorate: Degree[];

  @Prop({ required: false, type: [Certification] })
  @IsArray()
  certifications: Certification[];

  @Prop({ required: false, type: [Skill] })
  @IsArray()
  areasOfInterest: Skill[];

  @Prop({ required: false, type: [Skill] })
  @IsArray()
  languages: Skill[];

  @Prop({ required: false, type: [Experience] })
  @IsArray()
  workExperience: Experience[];

  @Prop({ required: false, type: [Experience] })
  @IsArray()
  featuredProjects: Experience[];

  @Prop({ required: false, type: [PublishedArticle] })
  @IsArray()
  publishedArticles: PublishedArticle[];

  @Prop({ required: false, type: [OngoingResearch] })
  @IsArray()
  ongoingResearch: OngoingResearch[];

  @Prop({ required: false, type: [Association] })
  @IsArray()
  professionalAssociations: Association[];

  @Prop({ required: false, type: [Conference] })
  @IsArray()
  conferencesAndSeminars: Conference[];

  @Prop({ required: false, type: [Workshop] })
  @IsArray()
  workshopsAndLectures: Workshop[];

  @Prop({ required: false, type: [Availability] })
  @IsArray()
  availability: Availability[];

  @Prop({ required: false, type: [Reference] })
  @IsArray()
  references: Reference[];

  @Prop({ required: false, type: [Skill] })
  @IsArray()
  technicalSkills: Skill[];

  @Prop({ required: false, type: [Skill] })
  @IsArray()
  interpersonalSkills: Skill[];

  @Prop({ required: false, type: [Skill] })
  @IsArray()
  additionalNotes: Skill[];

  @Prop({ required: false, type: [EventHistory] })
  @IsArray()
  eventHistory: EventHistory[];
}

export const UserSchema = SchemaFactory.createForClass(User);
