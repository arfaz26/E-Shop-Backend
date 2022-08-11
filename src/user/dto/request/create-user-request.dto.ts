import { Type } from 'class-transformer';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { Address } from 'shared/schema/address.schema';
import { PhoneNumber } from 'shared/schema/phone-number.schema';

export class CreateUserRequestDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsOptional()
  @Type(() => PhoneNumber)
  mobile?: PhoneNumber;

  @IsEmail()
  email: string;

  @IsOptional()
  address?: Address[];

  @IsString()
  password: string;
}
