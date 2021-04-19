import { Method } from '../types';
import { deepMerge, isPlainObject } from './util';

// headers属性名规范化
function normalizeHeaderName (headers: any, normalizeName: string): void {
  if (!headers) return;
  Object.keys(headers).forEach(name => {
    if (name !== normalizeName && name.toUpperCase() === normalizeName.toUpperCase()) {
      headers[normalizeName] = headers[name];
      delete headers[name];
    }
  })
}

// 处理headers
export function processHeaders(headers: any, data: any):any {
  normalizeHeaderName(headers, 'Content-Type');

  // 普通data对象，且没有传入Content-Type,设置默认
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8';
    }
  }
  return headers;
}

const ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

// 格式化响应体中的header：字符串 --> json
export function parseHeaders(headers: string): any {
  const parsed:any = {};
  let key;
  let val;
  let i;

  if (!headers) { return parsed; }

  headers.split('\r\n').forEach(function parser(line: any) {
    i = line.indexOf(':');
    key = line.substr(0, i).trim().toLowerCase();
    val = line.substr(i + 1).trim();

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
}

// 拍平默认headers与自定义header的数据
export function flattenHeaders(headers: any, method: Method): any {
  if (!headers) {
    return headers;
  }

  headers = deepMerge(headers.common || {}, headers[method] || {}, headers);

  const methodsToDelete = ['delete', 'get', 'head', 'options', 'post', 'put', 'patch', 'common'];

  methodsToDelete.forEach((method) => {
    delete headers[method];
  })

  return headers;
}