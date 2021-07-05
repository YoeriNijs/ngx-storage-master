import { isValueType } from './is-value-type-guard';
import { StorageObject } from './storage-object';
import { StorageService } from './storage-service';

/**
 * For versioning purposes. Increase number after breaking change.
 */
const STORAGE_VERSION = '1';

export class StorageServiceImpl implements StorageService {

  constructor(private storagePrefix: string, private storage: Storage) {}

  /**
   * Stores a value in the storage with version. Note that this setter prepends a pre-defined prefix that is injected
   * by a custom module.
   *
   * Assume the following key 'my-key' and prefix 'my-prefix'. If you store a value with this method,
   * this service will save a value to storage under the key 'my-prefix_my-key'.
   */
  store<ValueType>(key: string, value: ValueType): void {
    const keyWithPrefix = this.concatKeyWithPrefix(key);
    const storageObject: StorageObject<ValueType> = { version: STORAGE_VERSION, value };
    this.storage.setItem(keyWithPrefix, JSON.stringify(storageObject));
  }

  /**
   * Gets a type safe value from storage by using a required, custom typeGuard. IMPORTANT: you must define a guard, so
   * the type can be guaranteed at runtime. Of course, you have the flexibility to determine how strict your typeGuard
   * actually is.
   *
   * Assume the following value for the key 'defined-prefix_my-value' in storage:
   * {"version":"1","value":{"type":"animal","value":{"name":"monkey","isAlive":true}}}
   *
   * interface MyInterface {
   *   type: string;
   *   value: Record<string, unknown>;
   * }
   *
   * const typeGuard = (storedObject: StorageObject<MyInterface>) =>
   *   Object.getOwnPropertyNames(storageObject.value).includes('type');
   * const result: MyInterface = service.get<MyInterface>('my-value', typeGuard);
   * console.log(result); // {"type":"animal","value": { "name":"monkey","isAlive":true }}
   */
  get<ValueType>(
    key: string,
    typeGuard: (storedObject: StorageObject<ValueType>) => boolean
  ): ValueType | undefined {
    const keyWithPrefix = this.concatKeyWithPrefix(key);
    const value = this.storage.getItem(keyWithPrefix);
    if (!value) {
      return undefined;
    }

    const storageObject: StorageObject<ValueType> = JSON.parse(value);
    if (storageObject !== undefined
      && storageObject.value !== undefined
      && storageObject.version === STORAGE_VERSION
      && isValueType<ValueType>(storageObject, typeGuard)) {
      return storageObject.value;
    } else {
      return undefined;
    }
  }

  clear(): void {
    Object.keys(this.storage)
      .filter(k => k.startsWith(this.storagePrefix))
      .forEach(k => this.storage.removeItem(k));
  }

  private concatKeyWithPrefix(key: string): string {
    return `${this.storagePrefix}_${key}`;
  }
}
