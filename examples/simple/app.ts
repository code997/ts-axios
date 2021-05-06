import axios, { AxiosError } from '../../src/index';
import { AxiosTransformer } from '../../src/types';

// axios.request({
//   method: 'get',
//   url: '/simple/get',
//   responseType: 'json',
//   params: {
//     a: 1,
//     b: 2
//   }
// }).then((res) => {
//   console.log(res);
// }).catch((e: AxiosError) => {
//   console.log(e);
// });
// axios.get('/simple/get').then((res) => {
//   console.log('axios.get', res);
// });



// axios({
//   method: 'get',
//   url: '/simple/get',
//   params: {
//     foo: ['bar', 'baz']
//   }
// });

// axios({
//   method: 'get',
//   url: '/simple/get',
//   params: {
//     date: new Date()
//   }
// });

// axios({
//   method: 'get',
//   url: '/simple/get',
//   params: {
//     foo: '@:$, %40'
//   }
// })

// axios({
//   method: 'get',
//   url: '/simple/get',
//   params: {
//     foo: 'bar',
//     baz: null
//   }
// })

// axios({
//   method: 'get',
//   url: '/simple/get#hash',
//   params: {
//     hash: 'hash'
//   }
// })

// axios({
//   method: 'get',
//   url: '/simple/get?foo=bar',
//   params: {
//     bar: 'baz'
//   }
// })


// axios({
//   method: 'post',
//   url: '/base/post',
//   headers: {
//     'content-type': 'application/json; charset=utf-8'
//   },
//   data: { 
//     a: 1,
//     b: 2 
//   }
// }).then((res) => {
//   console.log('post', res);
// }).catch((e: AxiosError) => {
//   console.log(e);
// });

// const arr = new Int32Array([21, 31])
// axios({
//   method: 'post',
//   url: '/base/buffer',
//   data: arr
// })

axios.defaults.headers.common['common1'] = 'common1';
axios.defaults.headers.get['get1'] = 'get1';

axios.interceptors.request.use(config => {
  if (config.params) {
    config.params.request1 = 'request1'
  }
  return config;
});
axios.interceptors.request.use(config => {
  if (config.params) {
    config.params.request2 = 'request2'
  }
  return config;
});
axios.interceptors.response.use(response => {
  response.data.response1 = []
  return response;
});
axios.interceptors.response.use(response => {
  response.data.response2 = []
  return response;
});

const CancelToken = axios.CancelToken;
let cancel;

axios.get('/simple/get', {
  transformResponse: [
    ...(axios.defaults.transformResponse as AxiosTransformer[]),
    function (data) {
      data.abc = 'efg';
      return data;
    }
  ],
  cancelToken: new CancelToken(function(c) {
    cancel = c;
  }),
  params: {
    a: 1
  },
  headers: {
    name: 'WQ'
  },
}).then((res) => {
  console.log('axios.get1', res);
}).catch((e) => {
  console.log(axios.isCancel(e), 'isCancel');
  console.log(e.message, 'e.message');
});

cancel('取消了请求');

const CancelToken2 = axios.CancelToken;
const source = CancelToken2.source();
axios({
  url: '/simple/get',
  params: {
    a: 2
  },
  cancelToken: source.token
}).then((res) => {
  console.log('axios.get2', res);
}).catch((e) => {
  console.log(axios.isCancel(e), 'isCancel');
  console.log(e.message, 'e.message');
});

source.cancel('CancelToken2 取消请求');
axios({
  url: '/simple/get',
  params: {
    a: 2
  },
  cancelToken: source.token
}).then((res) => {
  console.log('axios.get2', res);
}).catch((e) => {
  console.log(axios.isCancel(e), 'isCancel');
  console.log(e.message, 'e.message');
});

const instance = axios.create()
instance({
  url: '/simple/get',
  params: {
    a: 2
  }
}).then((res) => {
  console.log(res);
})

// interface ResponseData<T = any> {
//   code: number
//   result: T
//   message: string
// }

// interface User {
//   name: string
//   age: number
// }

// function getUser<T>() {
//   return axios<ResponseData<T>>('/extend/user')
//     .then((res) => res.data);
// }

// async function test() {
//   const user = await getUser<User>();
//   console.log(user);
//   if (user) {
//     console.log(user.result.name);
//   }
// }

// test();