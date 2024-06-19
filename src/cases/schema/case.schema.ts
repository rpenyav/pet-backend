import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CaseDocument = Case & Document;

@Schema()
export class Case {
  @Prop({ required: true })
  paciente_id: string;

  @Prop({ required: true })
  descripcion: string;

  @Prop({ required: true })
  fecha_creacion: Date;

  @Prop({ required: true })
  estado: string;

  @Prop({ type: [{ medico_id: String, fecha: Date, estado: String }] })
  candidaturas: Array<{
    medico_id: string;
    fecha: Date;
    estado: string;
  }>;
}

export const CaseSchema = SchemaFactory.createForClass(Case);
