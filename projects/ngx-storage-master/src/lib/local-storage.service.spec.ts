import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';

import { LocalStorageService } from './local-storage.service';
import { LOCAL_STORAGE_PREFIX } from './storage-prefixes-tokens';

describe('LocalStorageService', () => {
  const createService = createServiceFactory({
    service: LocalStorageService,
    providers: [
      {
        provide: LOCAL_STORAGE_PREFIX,
        useValue: 'prefix'
      }
    ]
  });

  let spectator: SpectatorService<LocalStorageService>;

  beforeEach(() => {
    spectator = createService();
    localStorage.clear();
  });

  afterEach(() => localStorage.clear());

  it('should use localStorage', () => {
    localStorage.setItem('prefix_my-key', '{"version":"1","value":"valueForLocalStorage"}');
    const value = spectator.service.get<string>('my-key', () => true);
    expect(value).toEqual('valueForLocalStorage');
  });
});
