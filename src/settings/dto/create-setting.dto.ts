export class CreateSettingDto {
  readonly nombre_clinica: string;
  readonly direccion: string;
  readonly contacto: {
    telefono: string;
    email: string;
  };
  readonly horarios: {
    lunes: string;
    martes: string;
    miercoles: string;
    jueves: string;
    viernes: string;
    sabado: string;
    domingo: string;
  };
}
