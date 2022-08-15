import { HttpException, HttpStatus } from '@nestjs/common';
import { MESSAGES } from 'shared/enums/messages.enum';

export class NotFoundError extends HttpException {
  constructor(errorCode: string) {
    super({ errorCode, message: MESSAGES[errorCode] }, HttpStatus.NOT_FOUND);
  }
}
