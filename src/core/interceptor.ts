import { ResolvedFn, RejectedFn } from '../types';

interface Interceptor<T> {
  resolved: ResolvedFn<T>
  rejected?: RejectedFn
}

// 拦截器实例
export default class InterceptorManager<T> {
  // null: ---> eject
  private interceptors: Array<Interceptor<T> | null>

  constructor () {
    this.interceptors = [];
  }

  // 添加
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): Number {
    this.interceptors.push({
      resolved,
      rejected
    });
    return this.interceptors.length - 1;
  }

  // 执行
  forEach(fn: (interceptor: Interceptor<T>) => void): void {
    this.interceptors.forEach(interceptor => {
      if (interceptor !== null) {
        fn(interceptor);
      }
    })
  }

  // 移除
  eject(id: number): void {
    if (this.interceptors[id]) {
      this.interceptors[id] = null;
    }
  }
}