import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from 'shared/auth/auth.service';
import { MailerService } from 'shared/mail/service/mailer.service';
import { generateUid } from 'shared/utils/utils';
import { CreateUserRequestDto } from 'user/dto/request/create-user-request.dto';
import { LoginUserRequestDto } from 'user/dto/request/login-user-request.dto';
import { UpdatePasswordRequestDto } from 'user/dto/request/update-password-request.dto';
import { UpdateUserRequestDto } from 'user/dto/request/update-user-request.dto';
import { CreateUserResponseDto } from 'user/dto/response/create-user-response.dto';
import { UserEntity } from 'user/entity/user.entity';
import {
  EmailAlreadyExistsError,
  InvalidCredentialsError,
  InvalidPasswordError,
  NewPasswordMismatchError,
  UserNotFoundError,
} from 'user/exception/user.exception';
import { UserRepository } from 'user/repository/user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
    private readonly mailerService: MailerService,
  ) {}

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
    const token = this.authService.sign({ id: createdUser.id });
    return { user: createdUser, token };
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
    const token = this.authService.sign({ id: user.id });
    return { user, token };
  }

  async updateUser(id: string, updateUserAttributes: UpdateUserRequestDto) {
    const updatedUser = await this.userRepository.updateById(
      id,
      updateUserAttributes,
    );
    return UserEntity.toEntity(updatedUser);
  }

  async forgotPassword(email: string, req: Request) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UserNotFoundError();
    }
    const resetPasswordToken = generateUid();
    await this.mailerService.sendResetPasswordMail(
      user.email,
      user.fullName,
      this.generateResetPasswordUrl(req, resetPasswordToken),
    );
    await this.userRepository.updateById(user.id, { resetPasswordToken });
  }

  async updatePassword(
    user: UserEntity,
    updatePasswordAttributes: UpdatePasswordRequestDto,
  ) {
    const { password, newPassword, confirmNewPassword } =
      updatePasswordAttributes;

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      throw new InvalidPasswordError();
    }
    if (newPassword !== confirmNewPassword) {
      throw new NewPasswordMismatchError();
    }
    const hashedPassword = await this.hashPassword(newPassword);
    await this.userRepository.updateById(user.id, { password: hashedPassword });
  }

  async validateUser(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findById(id);
    return user ? UserEntity.toEntity(user) : null;
  }

  generateResetPasswordUrl(req: Request, resetPasswordToken: string) {
    return `${req.protocol}://${req.get(
      'Host',
    )}/api/users/reset-password/${resetPasswordToken}`;
  }
}
