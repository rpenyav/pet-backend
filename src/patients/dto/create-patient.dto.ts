export class CreatePatientDto {
  readonly nombre: string;
  readonly especie: string;
  readonly raza: string;
  readonly fecha_nacimiento: Date;
  readonly cliente_id: string;
}
