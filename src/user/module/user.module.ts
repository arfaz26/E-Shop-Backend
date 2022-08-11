import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from 'user/controller/user.controller';
import { UserRepository } from 'user/repository/user.repository';
import User from 'user/schema/user.schema';
import { UserService } from 'user/service/user.service';

@Module({
  controllers: [UserController],
  exports: [UserRepository, UserService],
  imports: [
    MongooseModule.forFeature([
      { name: User.modelName, schema: User.model.schema },
    ]),
  ],
  providers: [UserRepository, UserService],
})
export class UserModule {}
