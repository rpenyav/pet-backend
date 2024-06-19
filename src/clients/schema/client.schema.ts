import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClientDocument = Client & Document;

@Schema()
export class Client {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  telefono: string;

  @Prop({ required: true })
  direccion: string;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
