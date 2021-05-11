import axios, { AxiosError } from '../../src/index';

axios({
  url: '/simple/get',
  params: {
    a: 1,
    b: 2
  },
  withCredentials: false,
  xsrfCookieName: 'xsrf-token',
  xsrfHeaderName: 'xsrf-token'
}).then((res) => {
  console.log(res);
}).catch((e: AxiosError) => {
  console.log(e);
});