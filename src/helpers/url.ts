import util from './util';

function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function buildUrl(url?: string, params?: any) {
  if (!params) {
    return url || '';
  }

  const parts: string[] = [];

  Object.keys(params).forEach((key) => {
    let val = params[key];
    if (val === null || typeof val === 'undefined') return;
    let values: any [];
    if (util.isArray(val)) {
      values = val;
      key += '[]';
    } else {
      values = [val];
    }

    values.forEach(val => {
      if (util.isDate(val)) {
        val = val.toISOString();
      } else if (util.isPlainObject(val)) {
        val = JSON.stringify(val);
      }
      parts.push(`${encode(key)}=${encode(val)}`);
    });
  });

  const serializedParams = parts.join('&');

  // 如果有url中带有hash, 截取掉hash
  if (serializedParams && url) {
    const markIndex = url.indexOf('#');
    if (markIndex > -1) {
      url = url.slice(0, markIndex);
    }
    url += (url.indexOf('?') ? '?' : '&') + serializedParams;
  }

  return url || '';
}