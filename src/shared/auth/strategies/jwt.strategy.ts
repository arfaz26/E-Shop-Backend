import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigurationService } from 'shared/configuration/configuration.service';
import { CONFIGURATION } from 'shared/configuration/configuration.enum';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {
  constructor(private readonly configurationService: ConfigurationService) {
    super({
      secretOrKey: configurationService.get(CONFIGURATION.JWT_SECRET_KEY),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
    });
  }
}
