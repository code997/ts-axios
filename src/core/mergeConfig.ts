import { AxiosRequestConfig } from "../types";

const strats = Object.create(null);

function defaultStrat (val1:any, val2:any):any {
  return typeof val2 !== undefined ? val2 : val1;
}

/**
 * 只接受自定义配置合并策略
 * url、params、data,和每个请求强相关，默认配置没有意义，只从自定义中配置中获取
 **/
function formVal2Strat(val1: any, val2: any): any {
  if (typeof val2 !== 'undefined') {
    return val2;
  }
}

const stratKeysFromVal2 = ['url', 'params', 'data'];

stratKeysFromVal2.forEach(key => {
  strats[key] = formVal2Strat;
})

export default function mergeConfig(
  config1: AxiosRequestConfig,
  config2?: AxiosRequestConfig
): AxiosRequestConfig {
  if (!config2) {
    config2 = {}
  }

  const config = Object.create(null);

  for (let key in config2) {
    mergeField(key);
  }

  for (let key in config1) {
    if (!config1[key]) {
      mergeField(key);
    }
  }

  function mergeField(key: string):void {
    // strat[key]-->优先取自定义配置的值：stratKeysFromVal2
    const strat = strats[key] || defaultStrat;
    config[key] = strat(config1[key], config2![key]);
  }

  return config;
};