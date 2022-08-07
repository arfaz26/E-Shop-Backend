import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository, ModelType } from 'shared/repository/base.repository';
import User from 'user/schema/user.schema';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(
    @InjectModel(User.modelName) private readonly userModel: ModelType<User>,
  ) {
    super(userModel);
  }
}
