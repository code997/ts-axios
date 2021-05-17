import transform from '../../src/core/transform';
import {
  transformRequest,
  transformResponse
} from '../../src/helpers/data';

describe('helpers:data', () => {
  test('vaildate transformRequest', () => {
    const req = {a: 1}

    const transformReq = transformRequest(req);

    expect(transformReq).toBe('{"a":1}');
  })

  test('vaildate transformResponse', () => {
    const dataString = '{"code": 0, "data": {}}';

    const transformData = transformResponse(dataString);

    const dataObject = transformResponse({code: 0, data: {}});

    expect(transformData).toEqual({
      code: 0, 
      data: {}
    })
    expect(dataObject).toEqual({
      code: 0, 
      data: {}
    })
  
  })
})