import { getModelForClass, prop } from '@typegoose/typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { BaseModel, schemaOptions } from 'shared/models/base.model';
import { Address } from 'shared/schema/address.schema';
import { PhoneNumber } from 'shared/schema/phone-number.schema';

class User extends BaseModel {
  @prop({ required: true })
  firstName: string;

  @prop({ required: true })
  lastName: string;

  @prop({ _id: false, required: true })
  mobile?: PhoneNumber;

  @prop({ required: true, unique: true })
  email: string;

  @prop({ required: true })
  password: string;

  @prop({
    validate: {
      validator: (value: Address[]) => {
        return value.length <= 4;
      },
      message: 'Max 4 Address allowed',
    },
  })
  address?: Address[];

  static get model(): ModelType<User> {
    return getModelForClass(User, {
      schemaOptions: Object.assign({}, schemaOptions, {
        toJSON: {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          transform(doc, ret, options) {
            ret.id = String(ret._id);
            delete ret._id;
            delete ret.__v;
          },
        },
      }),
    });
  }

  static get modelName(): string {
    return this.model.modelName;
  }
}

export default User;
