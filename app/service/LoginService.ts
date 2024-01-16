import {
  AccessLevel,
  SingletonProto,
  Inject,
  EggContext,
} from '@eggjs/tegg';
import { EggLogger, EggHttpClient } from 'egg';

@SingletonProto({
  accessLevel: AccessLevel.PUBLIC,
})

export class LoginService {

  @Inject()
  logger: EggLogger;

  async getUserByToken(ctx: EggContext, token: string): Promise<any> {
    ctx.logger.info('getUserByToken', token);
    // TODO:
    return {
      name: 'test',
      email: 'test@test.com',
    };
  }
}
