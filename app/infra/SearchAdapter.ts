import {
  AccessLevel,
  SingletonProto,
} from '@eggjs/tegg';
import { SearchHitsMetadata } from '@elastic/elasticsearch/lib/api/types';
import { ESSearchAdapter } from 'cnpmcore/infra/SearchAdapter';

/**
 * Use elasticsearch to search the huge npm packages.
 */
@SingletonProto({
  accessLevel: AccessLevel.PUBLIC,
  name: 'searchAdapter',
})

// @ts-expect-error ignore
export class MySearchAdapter implements ESSearchAdapter {
}
