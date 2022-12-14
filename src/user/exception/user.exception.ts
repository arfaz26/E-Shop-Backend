import { HttpStatus } from '@nestjs/common';
import { ERROR_CODES } from 'shared/enums/error-code.enum';
import { NotFoundError } from 'shared/exceptions/not-found.exception';
import { ValidationError } from 'shared/exceptions/validation.exception';

export class EmailAlreadyExistsError extends ValidationError {
  constructor() {
    super(ERROR_CODES.EMAIL_ALREADY_EXISTS, HttpStatus.CONFLICT);
  }
}

export class UserNotFoundError extends NotFoundError {
  constructor() {
    super(ERROR_CODES.USER_NOT_FOUND);
  }
}

export class InvalidCredentialsError extends ValidationError {
  constructor() {
    super(ERROR_CODES.INVALID_CREDENTIALS, HttpStatus.UNAUTHORIZED);
  }
}

export class UnAuthorizedError extends ValidationError {
  constructor() {
    super(ERROR_CODES.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
  }
}

export class InvalidPasswordError extends ValidationError {
  constructor() {
    super(ERROR_CODES.INVALID_PASSWORD, HttpStatus.BAD_REQUEST);
  }
}

export class NewPasswordMismatchError extends ValidationError {
  constructor() {
    super(ERROR_CODES.NEW_PASSWORD_MISMATCH, HttpStatus.BAD_REQUEST);
  }
}

export class InvalidResetPasswordUrlError extends ValidationError {
  constructor() {
    super(ERROR_CODES.RESET_PASSWORD_LINK_EXPIRED, HttpStatus.BAD_REQUEST);
  }
}
