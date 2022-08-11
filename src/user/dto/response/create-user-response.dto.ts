import { Expose } from 'class-transformer';
import { UserEntity } from 'user/entity/user.entity';

export class CreateUserResponseDto {
  @Expose()
  token: string;

  @Expose()
  user: UserEntity;
}
