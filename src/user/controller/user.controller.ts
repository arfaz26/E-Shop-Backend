import { Body, Controller, Post } from '@nestjs/common';
import { Serialize } from 'shared/decorators/serialize.decorator';
import { CreateUserRequestDto } from 'user/dto/request/create-user-request.dto';
import { CreateUserResponseDto } from 'user/dto/response/create-user-response.dto';
import { UserService } from 'user/service/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Serialize(CreateUserResponseDto)
  async signUp(
    @Body() createUserAttributes: CreateUserRequestDto,
  ): Promise<CreateUserResponseDto> {
    return await this.userService.signup(createUserAttributes);
  }
}
