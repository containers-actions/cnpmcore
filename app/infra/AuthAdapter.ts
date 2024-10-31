import { AccessLevel, SingletonProto } from '@eggjs/tegg';
import { AuthAdapter } from 'cnpmcore/infra/AuthAdapter';

@SingletonProto({
  name: 'authAdapter',
  accessLevel: AccessLevel.PUBLIC,
})
export class NoneAuthAdapter extends AuthAdapter {
}