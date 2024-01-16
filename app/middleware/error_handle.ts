import { EggContext, Next } from '@eggjs/tegg';

export default function errorHandle(): any {
  return async (ctx: EggContext, next: Next) => {
    try {
      await next();
    } catch (err: any) {
      ctx.body = {
        success: false,
        data: {
          message: err?.message || 'unknown error',
        },
      };
    }
  };
}
