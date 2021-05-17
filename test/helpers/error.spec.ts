import { AxiosRequestConfig, AxiosResponse } from '../../src';
import {
  AxiosError,
  createError
} from '../../src/helpers/error';


describe('helpers:error', () => {
  test('vaildate createError', () => {
    const request = new XMLHttpRequest();
    const config: AxiosRequestConfig = { method: 'post' };
    const response: AxiosResponse = {
      data: {foo: 'bar'},
      status: 200,
      statusText: 'OK',
      headers: null,
      config: config,
      request: request
    }

    const error = createError('Boom!', config, 'SUCCESS', request, response);
    expect(error instanceof Error).toBeTruthy();
    expect(error.message).toBe('Boom!');
    expect(error.config).toEqual(config);
    expect(error.request).toEqual(request);
    expect(error.response).toEqual(response);
    expect(error.code).toBe('SUCCESS');
    expect(error.isAxiosError).toBeTruthy();
  })
});