import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';

import { SessionStorageService } from './session-storage.service';
import { SESSION_STORAGE_PREFIX } from './storage-prefixes-tokens';

describe('SessionStorageService', () => {
  const createService = createServiceFactory({
    service: SessionStorageService,
    providers: [
      {
        provide: SESSION_STORAGE_PREFIX,
        useValue: 'prefix'
      }
    ]
  });

  let spectator: SpectatorService<SessionStorageService>;

  beforeEach(() => {
    spectator = createService();
    sessionStorage.clear();
  });

  afterEach(() => sessionStorage.clear());

  it('should use sessionStorage', () => {
    sessionStorage.setItem('prefix_my-key', '{"version":"1","value":"valueForSessionStorage"}');
    const value = spectator.service.get<string>('my-key', () => true);
    expect(value).toEqual('valueForSessionStorage');
  });
});
