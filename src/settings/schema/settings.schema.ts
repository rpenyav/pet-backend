import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SettingDocument = Setting & Document;

class Contacto {
  @Prop({ required: true })
  telefono: string;

  @Prop({ required: true })
  email: string;
}

class Horarios {
  @Prop({ required: true })
  lunes: string;

  @Prop({ required: true })
  martes: string;

  @Prop({ required: true })
  miercoles: string;

  @Prop({ required: true })
  jueves: string;

  @Prop({ required: true })
  viernes: string;

  @Prop({ required: true })
  sabado: string;

  @Prop({ required: true })
  domingo: string;
}

@Schema()
export class Setting {
  @Prop({ required: true })
  nombre_clinica: string;

  @Prop({ required: true })
  direccion: string;

  @Prop({ required: true, type: Contacto })
  contacto: Contacto;

  @Prop({ required: true, type: Horarios })
  horarios: Horarios;
}

export const SettingSchema = SchemaFactory.createForClass(Setting);
