import {
  isDate,
  isPlainObject,
  isArray,
  extend,
  deepMerge
} from '../../src/helpers/util';

describe('helpers:util', () => {

  describe('isXX', () => {
    test('vaildate isDate', () => {
      expect(isDate(new Date())).toBeTruthy()
      expect(isDate(Date.now)).toBeFalsy()
    })
    test('vaildate isPlainObject', () => {
      expect(isPlainObject({})).toBeTruthy()
      expect(isPlainObject(new Date())).toBeFalsy()
    })
    test('vaildate isArray', () => {
      expect(isArray([])).toBeTruthy()
      expect(isArray(new Date())).toBeFalsy()
    })
  });

  describe('extend', () => {
    test('vaildate extend', () => {
      const a = {foo: 123, bar: 123};
      const b = {bar: 789}

      extend(a, b);

      expect(a.bar).toBe(789);
    })
  })

  describe('deepMerge', () => {
    test('vaildate deepMerge should undefined', () => {
      const a = Object.create(null);
      const b: any = { foo: 123 };
      const c: any = { bar: 456 };

      deepMerge(a, b, c);

      expect(typeof a.foo).toBe('undefined');
      expect(typeof b.bar).toBe('undefined');
      expect(typeof c.foo).toBe('undefined');
    })

    test('vaildate deepMerge should properties', () => {
      const a = Object.create(null);
      const b: any = { foo: 123 };
      const c: any = { bar: 456 };

      const d = deepMerge(a, b, c);

      expect(d.foo).toBe(123);
      expect(d.bar).toBe(456);
    })

    test('vaildate deepMerge recursively', () => {
      const a: any = { foo: { bar: 123 } };
      const b: any = { foo: { baz: 456 }, bar: { qux: 789 } };

      const c = deepMerge(a, b);

      expect(c).toEqual({
        foo: {
          bar: 123,
          baz: 456
        },
        bar: {
          qux: 789
        }
      })
    })
  })
});