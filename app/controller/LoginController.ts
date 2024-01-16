import {
  HTTPController,
  HTTPMethod,
  HTTPMethodEnum,
  Context,
  EggContext,
  HTTPParam,
  HTTPQuery,
  HTTPBody,
  Middleware,
  Inject,
} from '@eggjs/tegg';
import { EggLogger, EggAppConfig } from 'egg';
import { trace } from '../middleware/trace';
import { LoginService } from '../service/LoginService';
import { CacheAdapter } from 'cnpmcore/common/adapter/CacheAdapter';
import { UserService } from 'cnpmcore/core/service/UserService';

@HTTPController()
@Middleware(trace)
export class LoginController {
  @Inject()
  private readonly loginService: LoginService;

  @Inject()
  protected userService: UserService;

  @Inject()
  private cacheAdapter: CacheAdapter;

  @Inject()
  protected config: EggAppConfig;

  @Inject()
  private readonly logger: EggLogger;

  @HTTPMethod({
    method: HTTPMethodEnum.GET,
    path: '/cli/login/sso/:sessionId',
  })
  async cliLogin(@Context() ctx: EggContext, @HTTPParam() sessionId: string, @HTTPQuery() token: string) {
    this.logger.info('access url: %s', ctx.url);
    if (!sessionId) {
      return { success: false, data: { message: 'need sessionId' } };
    }
    if (!token) {
      return { success: false, data: { message: 'need token' } };
    }

    const sessionData = await this.cacheAdapter.get(sessionId);
    if (!sessionData) {
      return { success: false, data: { message: 'invalid sessionId' } };
    }

    const userInfo = await this.loginService.getUserByToken(ctx, token);

    if (!userInfo?.name || !userInfo?.email) {
      return { success: false, data: { message: 'invalid user info' } };
    }

    const { token: tokenInfo } = await this.userService.ensureTokenByUser({ name: userInfo.name, email: userInfo.email, ip: ctx.ip });
    await this.cacheAdapter.set(sessionId, tokenInfo!.token!);

    // return { success: true, data: { message: 'login success' } };
    ctx.redirect(`${this.config.cnpmcore.registry}/-/v1/login/request/success`);
    return;
  }

}
