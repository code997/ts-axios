import axios, { AxiosError } from '../../src/index';

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
axios.interceptors.request.use(config => {
  if (config.params) {
    config.params.request1 = 'request1'
  }
  console.log('request1')
  return config;
});
axios.interceptors.request.use(config => {
  if (config.params) {
    config.params.request2 = 'request2'
  }
  console.log('request2')
  return config;
});
axios.interceptors.response.use(response => {
  response.data.response1 = []
  console.log('response1')
  return response;
});
axios.interceptors.response.use(response => {
  response.data.response2 = []
  console.log('response2')
  return response;
});

axios('/simple/get', {
  params: {
    a: 1
  }
}).then((res) => {
  console.log('axios.get1', res);
});
axios({
  url: '/simple/get',
  params: {
    a: 2
  }
}).then((res) => {
  console.log('axios.get2', res);
});

interface ResponseData<T = any> {
  code: number
  result: T
  message: string
}

interface User {
  name: string
  age: number
}

function getUser<T>() {
  return axios<ResponseData<T>>('/extend/user')
    .then((res) => res.data);
}

async function test() {
  const user = await getUser<User>();
  console.log(user);
  if (user) {
    console.log(user.result.name);
  }
}

test();