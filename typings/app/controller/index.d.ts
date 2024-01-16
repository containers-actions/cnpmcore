// This file is created by egg-ts-helper@2.1.0
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportLoginController from '../../../app/controller/LoginController';

declare module 'egg' {
  interface IController {
    loginController: ExportLoginController;
  }
}
