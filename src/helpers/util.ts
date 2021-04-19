const toString = Object.prototype.toString;

export function isDate (val: any) {
  return toString.call(val) === '[object Date]';
}

export function isPlainObject(val: any) {
  return val !== null && toString.call(val) === '[object Object]';
}

export function isArray(val: any) { 
  return toString.call(val) === '[object Array]';
}

export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any;
  }
  return to as T & U;
}

export function deepMerge(...objs: any[]) {
  const result = Object.create(null);
  
  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach((key) => {
        const val = obj[key];
        if (isPlainObject(val)) {
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val);
          } else {
            result[key] = val;
          }
        } else {
          result[key] = val;
        }
      })
    }
  })

  return result;
}

export default {
  isDate,
  isPlainObject,
  isArray,
  extend,
  deepMerge
}