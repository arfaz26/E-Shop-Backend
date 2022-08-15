import { IsString } from 'class-validator';

export class ResetPasswordRequestDto {
  @IsString()
  password: string;

  @IsString()
  confirmPassword: string;
}
