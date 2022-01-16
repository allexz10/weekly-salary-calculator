import getRandomEmployee from './getRandomEmployee';

describe('getRandomEmployees()', () => {
  it('Array length must be 5', () => {
    const array: string[] = ['a', 'b', 'c', 'd', 'e', 'd'];
    expect(getRandomEmployee(array)).toHaveLength(5);
  });
  it('Array elements do not have to be in order', () => {
    const array: string[] = ['a', 'a', 'b', 'e', 'g', 'c', 'c', 'b'];
    expect(getRandomEmployee(array)).not.toBe(['a', 'a', 'b', 'e', 'g']);
  });
  it('Array elements do not have to be in order and have duplicates', () => {
    const array: string[] = ['a', 'a', 'a', 'b', 'b', 'c', 'c', 'e', 'd', 'g'];
    expect(getRandomEmployee(array)).not.toBe(['a', 'a', 'a', 'b', 'b']);
  });
});
