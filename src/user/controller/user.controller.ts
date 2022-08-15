import { Body, Controller, Post } from '@nestjs/common';
import { Serialize } from 'shared/decorators/serialize.decorator';
import { CreateUserRequestDto } from 'user/dto/request/create-user-request.dto';
import { LoginUserRequestDto } from 'user/dto/request/login-user-request.dto';
import { CreateUserResponseDto } from 'user/dto/response/create-user-response.dto';
import { LoginUserResponseDto } from 'user/dto/response/login-user-response.dto';
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
}
