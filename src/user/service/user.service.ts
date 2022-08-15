import { Injectable } from '@nestjs/common';
import { CreateUserRequestDto } from 'user/dto/request/create-user-request.dto';
import { LoginUserRequestDto } from 'user/dto/request/login-user-request.dto';
import { CreateUserResponseDto } from 'user/dto/response/create-user-response.dto';
import { UserEntity } from 'user/entity/user.entity';
import {
  EmailAlreadyExistsError,
  InvalidCredentialsError,
  UserNotFoundError,
} from 'user/exception/user.exception';
import { UserRepository } from 'user/repository/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async signup(
    createUserAttributes: CreateUserRequestDto,
  ): Promise<CreateUserResponseDto> {
    const isEmailExists = await this.userRepository.exists({
      email: createUserAttributes.email,
    });
    if (isEmailExists) {
      throw new EmailAlreadyExistsError();
    }
    const createdUser = await this.createUser(createUserAttributes);
    return { user: createdUser };
  }

  async hashPassword(password: string): Promise<string> {
    const hasedPassword = await UserEntity.generateHashedPassword(password);
    return hasedPassword;
  }

  private async createUser(
    createUserAttributes: CreateUserRequestDto,
  ): Promise<UserEntity> {
    const password = await this.hashPassword(createUserAttributes.password);
    const user = await this.userRepository.create({
      ...createUserAttributes,
      password,
    });
    return UserEntity.toEntity(user);
  }

  async login(loginUserAttributes: LoginUserRequestDto) {
    loginUserAttributes.email = loginUserAttributes.email.toLowerCase();
    const user = await this.userRepository.findByEmail(
      loginUserAttributes.email,
    );

    if (!user) {
      throw new UserNotFoundError();
    }

    const isPasswordMatched = await user.comparePassword(
      loginUserAttributes.password,
    );

    if (!isPasswordMatched) {
      throw new InvalidCredentialsError();
    }
    return { user };
  }
}
