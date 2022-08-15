import { Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { Address } from 'shared/schema/address.schema';
import { PhoneNumber } from 'shared/schema/phone-number.schema';

export class UpdateUserRequestDto {
  @IsOptional()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsOptional()
  @Type(() => PhoneNumber)
  mobile?: PhoneNumber;

  @IsOptional()
  address?: Address[];
}
