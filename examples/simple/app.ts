import axios, { AxiosError } from '../../src/index';

axios({
  method: 'get',
  url: '/simple/get',
  responseType: 'json',
  params: {
    a: 1,
    b: 2
  }
}).then((res) => {
  console.log(res);
}).catch((e: AxiosError) => {
  console.log(e);
});

axios({
  method: 'get',
  url: '/simple/get',
  params: {
    foo: ['bar', 'baz']
  }
});

axios({
  method: 'get',
  url: '/simple/get',
  params: {
    date: new Date()
  }
});

axios({
  method: 'get',
  url: '/simple/get',
  params: {
    foo: '@:$, %40'
  }
})

axios({
  method: 'get',
  url: '/simple/get',
  params: {
    foo: 'bar',
    baz: null
  }
})

axios({
  method: 'get',
  url: '/simple/get#hash',
  params: {
    hash: 'hash'
  }
})

axios({
  method: 'get',
  url: '/simple/get?foo=bar',
  params: {
    bar: 'baz'
  }
})


axios({
  method: 'post',
  url: '/base/post',
  headers: {
    'content-type': 'application/json; charset=utf-8'
  },
  data: { 
    a: 1,
    b: 2 
  }
})

const arr = new Int32Array([21, 31])
axios({
  method: 'post',
  url: '/base/buffer',
  data: arr
})