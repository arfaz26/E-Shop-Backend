import { SUCCESS_MESSAGES } from 'shared/enums/messages.enum';

export class SucessResponse<T> {
  message?: string;
  success: boolean;
  messageKey: string;
  data?: T | T[];

  constructor(messageKey: string, isSuccessful: boolean, data?: T | T[]) {
    this.message = SUCCESS_MESSAGES[messageKey];
    this.success = isSuccessful;
    this.messageKey = messageKey;
    this.data = data;
  }
}
