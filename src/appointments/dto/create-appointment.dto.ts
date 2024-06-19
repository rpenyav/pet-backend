export class CreateAppointmentDto {
  readonly paciente_id: string;
  readonly medico_id: string;
  readonly fecha: Date;
  readonly motivo: string;
  readonly estado: string;
}
