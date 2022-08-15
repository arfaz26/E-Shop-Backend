import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigurationService } from 'shared/configuration/configuration.service';
import { CONFIGURATION } from 'shared/configuration/configuration.enum';
import { Injectable } from '@nestjs/common';
import { IJwtPayload } from '../interface/jwt-payload.interface';
import { UserService } from 'user/service/user.service';
import { UnAuthorizedError } from 'user/exception/user.exception';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {
  constructor(
    private readonly configurationService: ConfigurationService,
    private readonly userService: UserService,
  ) {
    super({
      secretOrKey: configurationService.get(CONFIGURATION.JWT_SECRET_KEY),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
    });
  }

  async validate(payload: IJwtPayload) {
    const user = await this.userService.validateUser(payload.id);
    if (!user) {
      throw new UnAuthorizedError();
    }
    return user;
  }
}
