// This file is created by egg-ts-helper@2.1.0
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportErrorHandle from '../../../app/middleware/error_handle';
import ExportTrace from '../../../app/middleware/trace';

declare module 'egg' {
  interface IMiddleware {
    errorHandle: typeof ExportErrorHandle;
    trace: typeof ExportTrace;
  }
}
