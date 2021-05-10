import axios, { AxiosError } from '../../src/index';
import { AxiosTransformer } from '../../src/types';

axios({
  url: '/simple/get',
  params: {
    a: 1,
    b: 2
  }
}).then((res) => {
  console.log(res);
}).catch((e: AxiosError) => {
  console.log(e);
});