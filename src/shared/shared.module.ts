import { Global, Module } from '@nestjs/common';
import { UserModule } from 'user/module/user.module';
import { ConfigurationService } from './configuration/configuration.service';

@Global()
@Module({
  imports: [UserModule],
  exports: [ConfigurationService],
  providers: [ConfigurationService],
})
export class SharedModule {}
