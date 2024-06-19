import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DoctorDocument = Doctor & Document;

@Schema()
export class Doctor {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true, type: [String] })
  especialidades: string[];

  @Prop({ required: true })
  contacto: string;

  @Prop({ type: [{ caso_id: String, fecha: Date, estado: String }] })
  candidaturas: Array<{
    caso_id: string;
    fecha: Date;
    estado: string;
  }>;
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);
