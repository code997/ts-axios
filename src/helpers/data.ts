import util from './util';

export function transformRequest (data: any):any {
  if (util.isPlainObject(data)) {
    return JSON.stringify(data);
  }
  return data;
}

export function transformResponse (data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data);
    } catch (e) {
      // ...
    };
  }
  return data;
}