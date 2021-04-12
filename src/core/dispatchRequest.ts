import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types';
import { transformData, transformRequest } from '../helpers/data';
import { processHeaders } from '../helpers/headers';
import { buildUrl } from '../helpers/url';
import xhr from './xhr';

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config);
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

function processConfig (config: AxiosRequestConfig):void {
  config.url = transformUrl(config);
  config.data = transformRequestData(config);
  config.headers = transformHeaders(config);
}

function transformUrl (config: AxiosRequestConfig):string {
  const { url, params } = config;
  return buildUrl(url, params);
}

function transformRequestData (config: AxiosRequestConfig):any {
  return transformRequest(config.data);
}

function transformHeaders (config: AxiosRequestConfig):any {
  return processHeaders(config.headers, config.data);
}

function transformResponseData (res: AxiosResponse): AxiosResponse {
  res.data = transformData(res.data);
  return res;
}