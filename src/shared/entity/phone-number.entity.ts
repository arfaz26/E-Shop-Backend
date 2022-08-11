import { Expose } from 'class-transformer';
import { PhoneNumber } from 'shared/schema/phone-number.schema';

export class PhoneNumberEntity {
  @Expose()
  countryCode: string;

  @Expose()
  phoneNumber: string;

  constructor(phoneNumber: PhoneNumber = {} as PhoneNumber) {
    this.countryCode = phoneNumber.countryCode;
    this.phoneNumber = phoneNumber.phoneNumber;
  }

  static toEntity(address: PhoneNumber): PhoneNumberEntity {
    return new PhoneNumberEntity(address);
  }
}
