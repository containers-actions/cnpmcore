import { AccessLevel, EggContext, SingletonProto } from '@eggjs/tegg';
import { AuthAdapter } from 'cnpmcore/infra/AuthAdapter';
import { randomUUID } from 'crypto';
import { AuthUrlResult, userResult } from 'node_modules/cnpmcore/dist/app/common/typing';

const ONE_DAY = 3600 * 24;

@SingletonProto({
  name: 'authAdapter',
  accessLevel: AccessLevel.PUBLIC,
})
export class MyAuthAdapter extends AuthAdapter {
  async getAuthUrl(ctx: EggContext): Promise<AuthUrlResult> {
    const sessionId = randomUUID();
    await this.redis.setex(sessionId, ONE_DAY, '1');

    const registry = ctx.app.config.cnpmcore.registry;
    const ssoLogin = ctx.app.config.ssoLogin;
    const ref = encodeURIComponent(`${registry}/cli/login/sso/${sessionId}`);
    return {
      loginUrl: `${ssoLogin}?ref=${ref}`,
      doneUrl: `${registry}/-/v1/login/done/session/${sessionId}`,
    };
  }

  async ensureCurrentUser(): Promise<userResult | null> {
    if (this.user) {
      return this.user;
    }
    return null;
  }
}
