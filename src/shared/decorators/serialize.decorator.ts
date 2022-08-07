import { UseInterceptors } from '@nestjs/common';
import { SerializeInterceptor } from 'shared/interceptor/serialize.interceptor';

interface ClassConstructor {
  // eslint-disable-next-line
  new (...args: any[]): {};
}
export const Serialize = (dto: ClassConstructor) => {
  return UseInterceptors(new SerializeInterceptor(dto));
};
