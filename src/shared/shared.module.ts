import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'user/module/user.module';
import { AuthService } from './auth/auth.service';
import { JwtStrategyService } from './auth/strategies/jwt.strategy';
import { ConfigurationService } from './configuration/configuration.service';

@Global()
@Module({
  imports: [UserModule, JwtModule.register({}), PassportModule],
  exports: [ConfigurationService, AuthService],
  providers: [ConfigurationService, JwtStrategyService, AuthService],
})
export class SharedModule {}
