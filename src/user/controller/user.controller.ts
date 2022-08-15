import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGaurd } from 'shared/auth/guard/jwt-auth.guard';
import { Serialize } from 'shared/decorators/serialize.decorator';
import { SUCCESS_CODES } from 'shared/enums/success-code.enum';
import { SucessResponse } from 'shared/response/success-response';
import { CreateUserRequestDto } from 'user/dto/request/create-user-request.dto';
import { ForgotPasswordRequestDto } from 'user/dto/request/forgot-password-request.dto';
import { LoginUserRequestDto } from 'user/dto/request/login-user-request.dto';
import { UpdatePasswordRequestDto } from 'user/dto/request/update-password-request.dto';
import { UpdateUserRequestDto } from 'user/dto/request/update-user-request.dto';
import { CreateUserResponseDto } from 'user/dto/response/create-user-response.dto';
import { GetMyProfileResponseDto } from 'user/dto/response/get-my-profile-response.dto';
import { LoginUserResponseDto } from 'user/dto/response/login-user-response.dto';
import { UpdateUserResponseDto } from 'user/dto/response/update-user-response.dto';
import { UserService } from 'user/service/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  @Serialize(CreateUserResponseDto)
  async signUp(
    @Body() createUserAttributes: CreateUserRequestDto,
  ): Promise<CreateUserResponseDto> {
    return await this.userService.signup(createUserAttributes);
  }

  @Post('login')
  @Serialize(LoginUserResponseDto)
  async login(
    @Body() loginUserAttributes: LoginUserRequestDto,
  ): Promise<LoginUserResponseDto> {
    return await this.userService.login(loginUserAttributes);
  }

  @Get('me')
  @UseGuards(JwtAuthGaurd)
  @Serialize(GetMyProfileResponseDto)
  async getMyProfile(@Req() req) {
    const { user } = req;
    return user;
  }

  @Put('me')
  @UseGuards(JwtAuthGaurd)
  @Serialize(UpdateUserResponseDto)
  async updateProfile(
    @Req() req,
    @Body() updateUserAttributes: UpdateUserRequestDto,
  ) {
    const { user } = req;
    const updatedUser = await this.userService.updateUser(
      user.id,
      updateUserAttributes,
    );
    return updatedUser;
  }

  @Post('forgot-password')
  async forgotPassword(
    @Req() req: Request,
    @Body() { email }: ForgotPasswordRequestDto,
  ) {
    await this.userService.forgotPassword(email, req);
    return new SucessResponse(SUCCESS_CODES.FORGOT_PASSWORD, true);
  }

  @Put('update-password')
  @UseGuards(JwtAuthGaurd)
  async updatePassword(
    @Req() req,
    @Body() updatePasswordAttributes: UpdatePasswordRequestDto,
  ) {
    const { user } = req;
    await this.userService.updatePassword(user, updatePasswordAttributes);
    return new SucessResponse(SUCCESS_CODES.UPDATE_PASSWORD_SUCCESSFUL, true);
  }
}
