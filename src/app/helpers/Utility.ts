import {HttpParams} from '@angular/common/http';

export class Utility {
  static revert(params: any): HttpParams {
    params = Object.assign({}, params);
    Object.keys(params).forEach(key => {
      if (typeof params[key] === 'object') {
        params[key] = JSON.stringify(params[key]);
      } else if (params[key] === undefined) {
        delete params[key];
      }
    });
    return params;
  }
}
