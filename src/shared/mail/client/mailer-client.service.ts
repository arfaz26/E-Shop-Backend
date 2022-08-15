import { ConfigurationService } from 'shared/configuration/configuration.service';
import * as Mail from 'nodemailer/lib/mailer';
import { createTransport } from 'nodemailer';
import { CONFIGURATION } from 'shared/configuration/configuration.enum';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailerClientService {
  private nodeMailerTransport: Mail;

  constructor(private readonly configurationService: ConfigurationService) {
    this.nodeMailerTransport = createTransport({
      service: configurationService.get(CONFIGURATION.EMAIL_SERVICE),
      auth: {
        user: configurationService.get(CONFIGURATION.EMAIL_USER),
        pass: configurationService.get(CONFIGURATION.EMAIL_PASSWORD),
      },
    });
  }

  sendMail(options: Mail.Options) {
    return this.nodeMailerTransport.sendMail(options);
  }
}
