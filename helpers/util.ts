const toString = Object.prototype.toString;

export function isDate (val: any) {
  return toString.call(val) === '[object Date]';
}

export function isObject(val: any) {
  return val !== null && toString.call(val) === '[object Object]';
}

export function isArray(val: any) {
  return toString.call(val) === '[object Array]';
}

export default {
  isDate,
  isObject,
  isArray
}