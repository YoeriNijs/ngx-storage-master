import { StorageObject } from './storage-object';
import { StorageServiceImpl } from './storage-service-impl.service';

interface TestObject {
  type: 'animal' | 'car';
  value: Record<string, unknown>;
}

describe('StorageServiceImpl', () => {

  let service: StorageServiceImpl;

  beforeEach(() => {
    localStorage.clear();
    service = new StorageServiceImpl('my-local-storage-prefix', localStorage);
  });

  afterEach(() => localStorage.clear());

  describe('#store', () => {
    it('should store values in storage with the predefined prefix', () => {
      const testObject: TestObject = {
        type: 'animal',
        value: { name: 'monkey', isAlive: true }
      };
      service.store<TestObject>('test-object', testObject);
      expect(localStorage.getItem('my-local-storage-prefix_test-object')).toEqual(
        '{"version":"1","value":{"type":"animal","value":{"name":"monkey","isAlive":true}}}'
      );
    });

    it.each([[], '', 0, false, {}])('Should be able to store and retrieve falsy value "%s"', (item) => {
      service.store<unknown>('falsy-value', item);
      const testObject = service.get<unknown>('falsy-value', () => true);
      expect(testObject).toEqual(item);
    });
  });

  describe('#get', () => {
    it('should get a value from storage if a valid typeGuard is defined', () => {
      localStorage.setItem('my-local-storage-prefix_my-key', '{"version":"1","value":' +
        '{"type":"animal","value":{"name":"monkey","isAlive":true}}}');

      const typeGuard = (storedObject: StorageObject<TestObject>) => storedObject.value.type === 'animal';
      const result = service.get<TestObject>('my-key', typeGuard);
      expect(result?.type).toEqual('animal');
      expect(result?.value).toEqual({ name: 'monkey', isAlive: true });
    });

    it('should return undefined from storage if the typeGuard is invalid', () => {
      localStorage.setItem('my-local-storage-prefix_my-key', '{"version":"1","value":' +
        '{"type":"animal","value":{"name":"monkey","isAlive":true}}}');

      const typeGuard = () => false;
      const testObject = service.get<TestObject>('my-key', typeGuard);
      expect(testObject).toBeUndefined();
    });

    it('should get a value from storage if the object has version and value is false', () => {
      localStorage.setItem('my-local-storage-prefix_my-key', '{"version":"1","value":false}');

      const typeGuard = (storageObject: StorageObject<boolean>) => !storageObject.value;
      const testObject = service.get<boolean>('my-key', typeGuard);
      expect(testObject).toBe(false);
    });

    it('should get undefined from storage if the object has no version', () => {
      localStorage.setItem('my-local-storage-prefix_my-key', '{"value":"my-value"}');
      const testObject = service.get<boolean>('my-key', () => true);
      expect(testObject).toBeUndefined();
    });

    it('should get undefined from storage if the object has an invalid version', () => {
      localStorage.setItem('my-local-storage-prefix_my-key', '{"version":"-1","value":"my-value"}');
      const testObject = service.get<boolean>('my-key', () => true);
      expect(testObject).toBeUndefined();
    });
  });

  describe('#clear', () => {
    it('should delete all values with the prefix at once', () => {
      localStorage.setItem('my-local-storage-prefix_key1', 'value1');
      localStorage.setItem('my-remote-storage-prefix_key2', 'value2');
      localStorage.setItem('my-local-storage-prefix_key3', 'value3');
      expect(localStorage.length).toBe(3);
      service.clear();
      expect(localStorage.length).toBe(1);
      expect(localStorage.getItem('my-remote-storage-prefix_key2')).toEqual('value2');
    });
  });
});
