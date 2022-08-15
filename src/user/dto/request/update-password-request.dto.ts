import { IsString, IsNotEmpty } from 'class-validator';

export class UpdatePasswordRequestDto {
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  newPassword: string;

  @IsString()
  @IsNotEmpty()
  confirmNewPassword: string;
}
