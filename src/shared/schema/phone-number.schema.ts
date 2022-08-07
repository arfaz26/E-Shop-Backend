import { prop } from '@typegoose/typegoose';

export class PhoneNumber {
  @prop({ required: true })
  countryCode: string;

  @prop({ required: true })
  phoneNumber: string;
}
