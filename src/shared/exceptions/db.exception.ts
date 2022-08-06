import { HttpException, HttpStatus } from '@nestjs/common';
import { MongoError } from 'mongodb';

export class DBException extends HttpException {
  constructor(error: MongoError) {
    super(
      {
        code: error.code,
        message: (error as any)._message || (error as any).message,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
