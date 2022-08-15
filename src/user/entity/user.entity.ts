import { DocumentType } from '@typegoose/typegoose';
import { Exclude, Expose, Type } from 'class-transformer';
import { AddressEntity } from 'shared/entity/address.entity';
import { PhoneNumberEntity } from 'shared/entity/phone-number.entity';
import User from 'user/schema/user.schema';
import { genSalt, hash, compare } from 'bcrypt';

export class UserEntity {
  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  @Type(() => PhoneNumberEntity)
  mobile?: PhoneNumberEntity;

  @Expose()
  email: string;

  @Expose()
  address?: AddressEntity[];

  @Expose()
  id: string;

  @Exclude()
  password: string;

  @Exclude()
  createdAt?: Date;

  @Exclude()
  updatedAt?: Date;

  constructor(user: User = {} as User) {
    Object.assign(this, user);
    if (user.createdAt) {
      this.createdAt = new Date(user.createdAt);
    }
    if (user.updatedAt) {
      this.updatedAt = new Date(user.updatedAt);
    }
    if (user.address) {
      this.address = AddressEntity.toEntityArray(user.address);
    }
  }

  static async generateHashedPassword(password: string): Promise<string> {
    const salt = await genSalt(10);
    return hash(password, salt);
  }
  async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.password);
  }

  static toEntity(response: DocumentType<User>) {
    const responseAsJson = response?.toJSON
      ? response.toJSON({ flattenMaps: true })
      : response;
    return new UserEntity(responseAsJson);
  }
}
