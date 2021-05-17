import cookie from '../../src/helpers/cookie';

describe('helpers:cookie', () => {
  test('test read cookie', () => {
    document.cookie = 'foo=baz';
    expect(cookie.read('foo')).toBe('baz');
    expect(cookie.read('baz')).toBeNull();
  })
})