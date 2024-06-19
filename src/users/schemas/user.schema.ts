import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ collection: 'pet_users' })
export class User {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  rol: string;

  @Prop({ required: true })
  password_hash: string;

  @Prop({ default: Date.now })
  fecha_creacion: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
