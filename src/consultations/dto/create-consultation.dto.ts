export class CreateConsultationDto {
  readonly paciente_id: string;
  readonly medico_id: string;
  readonly fecha_hora: Date;
  readonly descripcion: string;
  readonly tratamiento: string;
  readonly notas_adicionales?: string;
}
