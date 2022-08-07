import { prop } from '@typegoose/typegoose';

export class Address {
  @prop({ required: true })
  house: string;

  @prop()
  street: string;

  @prop({ required: true })
  city: string;

  @prop({ required: true })
  state: string;

  @prop({ required: true })
  landmark: string;

  @prop({ required: true })
  zipcode: string;
}
