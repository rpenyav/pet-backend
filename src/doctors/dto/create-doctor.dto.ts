export class CreateDoctorDto {
  readonly nombre: string;
  readonly especialidades: string[];
  readonly contacto: string;
  readonly candidaturas?: Array<{
    caso_id: string;
    fecha: Date;
    estado: string;
  }>;
}
