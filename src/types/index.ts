import axios from '../axios';
import InterceptorManager from '../core/interceptor';

// method 允许传入的合法字符串
export type Method = 'get' | 'GET'
  | 'post' | 'POST'
  | 'delete' | 'DELETE'
  | 'head' | 'HEAD'
  | 'options' | 'OPTIONS'
  | 'put' | 'PUT'
  | 'patch' | 'PATCH';

// Axios config参数字段定义
export interface AxiosRequestConfig {
  url?: string
  method?: Method
  headers?: any
  data?: any
  params?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
  [propName: string]: any
  transformRequest?: AxiosTransformer | AxiosTransformer[]
  transformResponse?: AxiosTransformer | AxiosTransformer[]
  cancelToken?: CancelToken,
  withCredentials?: Boolean,
  xsrfCookieName?: string,
  xsrfHeaderName?: string
}

export interface AxiosTransformer {
  (data: any, headers?: any): any
}

// Axios 响应体字段定义
export interface AxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

/* *
 * AxiosPromise 
 * 当 axios 返回的是 AxiosPromise 类型，
 * 那么 resolve 函数中的参数就是一个 AxiosResponse 类型
 * */
export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {

}

// AxiosError类
export interface AxiosError extends Error {
  config: AxiosRequestConfig
  code?: string
  request?: any
  response?: AxiosResponse
  isAxiosError: boolean
}

// Axios
export interface Axios {
  defaults: AxiosRequestConfig

  interceptors: Interceptors

  request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
}

export interface AxiosInstance extends Axios {
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}

export interface AxiosStatic extends AxiosInstance {
  create(config?: AxiosRequestConfig): AxiosInstance

  CancelToken: CancelToken
  Cancel: CancelStatic
  isCancel: (value: any) => boolean
}

// 拦截器定义
export interface AxiosInterceptorManager<T> {
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number

  eject(id: number): void
}
// 拦截器成功执行函数
export interface ResolvedFn<T> {
  (val: T): T | Promise<T>
}
// 拦截器失败执行函数
export interface RejectedFn {
  (error: any): any
}
// 拦截器子项接口实现定义 axios.interceptors.*
export interface Interceptors {
  request: InterceptorManager<AxiosRequestConfig>
  response: InterceptorManager<AxiosResponse>
}

// 拦截器链式调用定义
export interface PromiseChain<T> {
  resolved: ResolvedFn<T> | ((config: AxiosRequestConfig) => AxiosPromise<T>)
  rejected?: RejectedFn
}

// CancelToken实例类
export interface CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel

  throwIfRequested(): void
}
// 取消方法的接口定义
export interface Canceler {
  (message?: string): void
}
// 是CancelToken 类构造函数参数的接口定义
export interface CancelExecutor {
  (canceler: Canceler): void
}

// CancelToken 类静态方法
export interface CancelTokenSource {
  token: CancelToken
  cancel: Canceler
}

// CancelToken 类的类型
export interface CancelTokenStatic {
  new (executor: CancelExecutor): CancelToken
  source(): CancelTokenSource
}

// CancelStatic 返回值
export interface Cancel {
  message?: string
}

// axios.cancel方法定义
export interface CancelStatic {
  new (message?: string): Cancel
}
