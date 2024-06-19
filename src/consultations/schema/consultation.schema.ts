import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ConsultationDocument = Consultation & Document;

@Schema()
export class Consultation {
  @Prop({ required: true })
  paciente_id: string;

  @Prop({ required: true })
  medico_id: string;

  @Prop({ required: true })
  fecha_hora: Date;

  @Prop({ required: true })
  descripcion: string;

  @Prop({ required: true })
  tratamiento: string;

  @Prop()
  notas_adicionales?: string;
}

export const ConsultationSchema = SchemaFactory.createForClass(Consultation);
