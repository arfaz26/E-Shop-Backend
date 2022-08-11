import { IsEmail, IsString } from 'class-validator';
export class LoginUserRequestDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
