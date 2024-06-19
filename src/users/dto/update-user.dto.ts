import {
  IsString,
  IsEmail,
  IsOptional,
  MinLength,
  IsEnum,
} from 'class-validator';
import { UserRole } from '../roles.enum';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  readonly nombre?: string;

  @IsEmail()
  @IsOptional()
  readonly email?: string;

  @IsEnum(UserRole)
  @IsOptional()
  readonly rol?: UserRole;

  @IsString()
  @MinLength(8)
  @IsOptional()
  readonly password_hash?: string;
}
