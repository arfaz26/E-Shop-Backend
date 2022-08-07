import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CONFIGURATION } from './configuration.enum';
import IEnvironmentVariables from './models/env-vars.interface';

@Injectable()
export class ConfigurationService {
  static mongoUrl: string;
  constructor(
    private readonly _configService: ConfigService<IEnvironmentVariables>,
  ) {
    ConfigurationService.mongoUrl =
      process.env[CONFIGURATION.MONGO_URL] ||
      this._configService.get(CONFIGURATION.MONGO_URL);
  }

  get(name: string) {
    return (
      process.env[name] ||
      this._configService.get(name as keyof IEnvironmentVariables)
    );
  }
}
