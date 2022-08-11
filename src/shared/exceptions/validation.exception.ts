import { HttpException, HttpStatus } from '@nestjs/common';
import { MESSAGES } from 'shared/enums/messages.enum';

export class ValidationError extends HttpException {
  constructor(
    errorCode: string,
    status = HttpStatus.BAD_REQUEST,
    name = 'ValidationError',
  ) {
    super({ errorCode, message: MESSAGES[errorCode] }, status);
    this.name = name;
  }
}
