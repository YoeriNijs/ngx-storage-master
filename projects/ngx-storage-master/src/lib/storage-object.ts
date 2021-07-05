/**
 * Internal storage object for storage services. Values are wrapped inside this object before they are stored.
 */
export interface StorageObject<T> {
  version: string; // For versioning purposes
  value: T;
}
