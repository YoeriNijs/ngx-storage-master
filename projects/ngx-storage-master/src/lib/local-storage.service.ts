import { Inject, Injectable } from '@angular/core';

import { LOCAL_STORAGE_PREFIX } from './storage-prefixes-tokens';
import { StorageServiceImpl } from './storage-service-impl.service';

/**
 * Custom service for interactions with the local storage api. It is possible to define a custom session
 * storage prefix. If this prefix is not defined in any module, this will just use a default prefix value.
 */
@Injectable({ providedIn: 'root' })
export class LocalStorageService extends StorageServiceImpl {

  constructor(@Inject(LOCAL_STORAGE_PREFIX) localStoragePrefix: string = 'localStoragePrefix') {
    super(localStoragePrefix, localStorage);
  }
}
