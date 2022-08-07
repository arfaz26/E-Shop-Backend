import { Expose } from 'class-transformer';
import { Address } from 'shared/schema/address.schema';

export class AddressEntity {
  @Expose()
  house: string;

  @Expose()
  street?: string;

  @Expose()
  city: string;

  @Expose()
  state: string;

  @Expose()
  landmark: string;

  @Expose()
  zipcode: string;

  constructor(address: Address = {} as Address) {
    this.house = address.house;
    this.street = address.street;
    this.city = address.city;
    this.state = address.state;
    this.landmark = address.landmark;
    this.zipcode = address.zipcode;
  }

  static toEntity(address: Address): AddressEntity {
    return new AddressEntity(address);
  }

  static toEntityArray(addresses: Address[]): AddressEntity[] {
    return addresses.map((address) => AddressEntity.toEntity(address));
  }
}
