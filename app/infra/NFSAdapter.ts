import { AccessLevel, SingletonProto } from '@eggjs/tegg';
import { NFSClientAdapter } from 'cnpmcore/infra/NFSClientAdapter';

@SingletonProto({
  name: 'nfsClient',
  accessLevel: AccessLevel.PUBLIC,
})
export class NFSClient extends NFSClientAdapter {
}
