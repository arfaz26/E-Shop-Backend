import { Injectable } from '@nestjs/common';
import { MAIL } from 'shared/enums/mail.enum';
import { MailerClientService } from '../client/mailer-client.service';
import { templates } from '../templates/mail-templates';

@Injectable()
export class MailerService {
  constructor(private readonly mailerClientService: MailerClientService) {}

  async sendResetPasswordMail(to: string, name: string, resetLink: string) {
    await this.mailerClientService.sendMail({
      to,
      subject: templates[MAIL.FORGOT_PASSWORD].getSubject(),
      html: templates[MAIL.FORGOT_PASSWORD].getMessage(name, resetLink),
    });
  }
}
