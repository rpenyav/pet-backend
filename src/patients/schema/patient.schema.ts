import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PatientDocument = Patient & Document;

@Schema()
export class Patient {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  especie: string;

  @Prop({ required: true })
  raza: string;

  @Prop({ required: true })
  fecha_nacimiento: Date;

  @Prop({ required: true })
  cliente_id: string;

  @Prop({
    type: [
      {
        fecha: Date,
        descripcion: String,
        tratamiento: String,
        medico_id: String,
      },
    ],
  })
  historial_medico: Array<{
    fecha: Date;
    descripcion: string;
    tratamiento: string;
    medico_id: string;
  }>;

  @Prop({ type: [String] })
  citas_proximas: string[];
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
