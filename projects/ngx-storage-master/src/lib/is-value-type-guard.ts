import { StorageObject } from './storage-object';

/**
 * Guard that is used to guarantee type safety inside session storage services.
 */
export const isValueType = <ValueType>(
  localStorageValue: any,
  typeGuard: (storedObject: StorageObject<ValueType>) => boolean
): localStorageValue is ValueType => typeGuard(localStorageValue);
