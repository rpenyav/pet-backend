export class CreateCaseDto {
  readonly paciente_id: string;
  readonly descripcion: string;
  readonly fecha_creacion: Date;
  readonly estado: string;
  readonly candidaturas?: Array<{
    medico_id: string;
    fecha: Date;
    estado: string;
  }>;
}
