import { AccessLevel, SingletonProto } from '@eggjs/tegg';
import { RedisQueueAdapter } from 'cnpmcore/infra/QueueAdapter';

@SingletonProto({
  name: 'queueAdapter',
  accessLevel: AccessLevel.PUBLIC,
})
export class MyQueueAdapter extends RedisQueueAdapter {
}
