import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { CONFIGURATION } from 'shared/configuration/configuration.enum';
import { ConfigurationService } from 'shared/configuration/configuration.service';
import { IJwtPayload } from './interface/jwt-payload.interface';

@Injectable()
export class AuthService {
  private readonly jwtAccessTokenOptions: JwtSignOptions;
  constructor(
    private readonly configurationService: ConfigurationService,
    private readonly jwtService: JwtService,
  ) {
    this.jwtAccessTokenOptions = {
      expiresIn: configurationService.get(CONFIGURATION.JWT_EXPIRE_TIME),
      secret: configurationService.get(CONFIGURATION.JWT_SECRET_KEY),
    };
  }

  sign(payload: IJwtPayload) {
    return this.jwtService.sign(payload, this.jwtAccessTokenOptions);
  }
}
