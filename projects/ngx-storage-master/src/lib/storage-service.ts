import { StorageObject } from './storage-object';

export interface StorageService {
  /**
   * Stores a value in the storage service.
   */
  store<ValueType>(key: string, value: ValueType): void;

  /**
   * Retrieves a value from the storage service.
   */
  get<ValueType>(key: string, typeGuard: (storedObject?: StorageObject<ValueType>) => boolean): ValueType | undefined;

  /**
   * Clears the entire storage for the configured storage prefix.
   */
  clear(): void;
}
