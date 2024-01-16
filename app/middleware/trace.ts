import { EggContext, Next } from '@eggjs/tegg';

export async function trace(ctx: EggContext, next: Next) {
  ctx.logger.info('access url: %s', ctx.url);
  await next();
}
