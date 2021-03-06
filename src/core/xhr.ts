import { parseHeaders } from '../helpers/headers';
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types';
import { createError } from '../helpers/error';
import { isURLSameOrigin } from '../helpers/url';
import cookie from '../helpers/cookie';

export default function xhr(config: AxiosRequestConfig):AxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      data = null,
      url = '',
      method = 'get',
      headers = {},
      responseType,
      timeout,
      cancelToken,
      withCredentials,
      xsrfCookieName,
      xsrfHeaderName,
      validateStatus
    } = config;

    const request = new XMLHttpRequest();

    if (responseType) {
      request.responseType = responseType;
    }

    if (timeout) {
      request.timeout = timeout;
    }

    if (cancelToken) {
      cancelToken.promise.then((reason) => {
        request.abort();
        reject(reason);
      })
    }

    if (withCredentials) {
      request.withCredentials = true;
    }

    if ((withCredentials || isURLSameOrigin(url)) && xsrfCookieName) {
      const xsrfValue = cookie.read(xsrfCookieName);
      if (xsrfValue) {
        headers[xsrfHeaderName!] = xsrfValue;
      }
    }

    request.open(method.toUpperCase(), url, true);

    request.onreadystatechange = function handleLoad () {
      if (request.readyState !== 4) return;
      const responseHeaders = parseHeaders(request.getAllResponseHeaders());
      const responseData = responseType && responseType !== 'text' ? request.response : request.responseText;
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      handleResponse(response);
    }

    request.onerror = function handleError() {
      reject(createError(
        'Network Error',
        config,
        null,
        request
      ));
    }

    request.ontimeout = function handleTimeout () {
      reject(createError(
        `Timeout of ${timeout} ms exceeded`,
        config,
        'ECONNABORTED',
        request
      ));
    }

    Object.keys(headers).forEach((name) => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name];
      } else {
        request.setRequestHeader(name, headers[name]);
      }
    });

    // ???????????????,???????????????200-300??????????????????
    function handleResponse(response: AxiosResponse) {
      if (!validateStatus || validateStatus(response.status)) {
        resolve(response);
      } else {
        reject(createError(
          `Request failed with status code ${response.status}`,
          config,
          null,
          request,
          response
        ));
      }
    }

    request.send(data);
  });
}