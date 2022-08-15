import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'user/module/user.module';
import { AuthService } from './auth/auth.service';
import { JwtStrategyService } from './auth/strategies/jwt.strategy';
import { ConfigurationService } from './configuration/configuration.service';
import { MailerClientService } from './mail/client/mailer-client.service';
import { MailerService } from './mail/service/mailer.service';

@Global()
@Module({
  imports: [UserModule, JwtModule.register({}), PassportModule],
  exports: [ConfigurationService, AuthService, MailerService],
  providers: [
    ConfigurationService,
    JwtStrategyService,
    AuthService,
    MailerClientService,
    MailerService,
  ],
})
export class SharedModule {}
