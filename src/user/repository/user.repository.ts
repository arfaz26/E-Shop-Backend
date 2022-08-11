import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository, ModelType } from 'shared/repository/base.repository';
import { UserEntity } from 'user/entity/user.entity';
import User from 'user/schema/user.schema';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(
    @InjectModel(User.modelName) private readonly userModel: ModelType<User>,
  ) {
    super(userModel);
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.findOne({ email });
    return user ? UserEntity.toEntity(user) : null;
  }
}
