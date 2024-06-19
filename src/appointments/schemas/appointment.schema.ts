import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AppointmentDocument = Appointment & Document;

@Schema()
export class Appointment {
  @Prop({ required: true })
  paciente_id: string;

  @Prop({ required: true })
  medico_id: string;

  @Prop({ required: true })
  fecha: Date;

  @Prop({ required: true })
  motivo: string;

  @Prop({ required: true })
  estado: string;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
