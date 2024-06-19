import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsEnum,
} from 'class-validator';
import { UserRole } from '../roles.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsEnum(UserRole)
  @IsNotEmpty()
  readonly rol: UserRole;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  readonly password_hash: string;

  readonly fecha_creacion: Date;
}
