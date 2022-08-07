import { HttpStatus } from '@nestjs/common';
import { ERROR_CODES } from 'shared/enums/error-code.enum';
import { ValidationError } from 'shared/exceptions/validation.exception';

export class EmailAlreadyExistsError extends ValidationError {
  constructor() {
    super(ERROR_CODES.EMAIL_ALREADY_EXISTS, HttpStatus.CONFLICT);
  }
}
