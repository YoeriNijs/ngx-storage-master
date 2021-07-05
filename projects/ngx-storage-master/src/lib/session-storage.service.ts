import { Inject, Injectable } from '@angular/core';

import { SESSION_STORAGE_PREFIX } from './storage-prefixes-tokens';
import { StorageServiceImpl } from './storage-service-impl.service';

/**
 * Custom service for interactions with the session storage api. It is possible to define a custom session
 * storage prefix. If this prefix is not defined in any module, this will just use a default prefix value.
 */
@Injectable({ providedIn: 'root' })
export class SessionStorageService extends StorageServiceImpl {

  constructor(@Inject(SESSION_STORAGE_PREFIX) sessionStoragePrefix: string = 'sessionStoragePrefix') {
    super(sessionStoragePrefix, sessionStorage);
  }
}
