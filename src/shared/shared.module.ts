import { Global, Module } from '@nestjs/common';
import { ConfigurationService } from './configuration/configuration.service';

@Global()
@Module({
  exports: [ConfigurationService],
  providers: [ConfigurationService],
})
export class SharedModule {}
