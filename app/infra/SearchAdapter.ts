import {
  AccessLevel,
  SingletonProto,
} from '@eggjs/tegg';
import { ESSearchAdapter } from 'cnpmcore/infra/SearchAdapter';

/**
 * Use elasticsearch to search the huge npm packages.
 */
@SingletonProto({
  accessLevel: AccessLevel.PUBLIC,
  name: 'searchAdapter',
})

// @ts-expect-error ignore
export class SearchAdapter implements ESSearchAdapter {
}
