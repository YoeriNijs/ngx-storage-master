import { isValueType } from './is-value-type-guard';

interface EvilPerson {
  name: string;
}

describe('isValueTypeGuard', () => {
  it('should return true if guard returns true', () => {
    const myEvilPersonAsAny: any = { name: 'GargaMel' };
    const isTyped = isValueType<EvilPerson>(myEvilPersonAsAny, () => true);
    expect(isTyped).toBe(true);
  });

  it('should return false if guard returns false', () => {
    const myEvilPersonAsAny: any = { name: 'Dr. Evil' };
    const isTyped = isValueType<EvilPerson>(myEvilPersonAsAny, () => false);
    expect(isTyped).toBe(false);
  });
});
