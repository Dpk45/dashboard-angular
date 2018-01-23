import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ErpService {
  private baseUrl = 'http://localhost:3000/3.0';
  constructor(private _http: Http, private _httpClient: HttpClient) {

  }
  // create erp_integration
  sendErpRequest(selectedValue, performedAt, payload, brand) {
    brand = brand + '_dev';
    const _path: string = (this.baseUrl + '/erp_integration?key=' + brand),
      body: any = { 'action': selectedValue, 'performed_at': performedAt, 'payload': payload }
    return this._http.post(_path, body)
      .map(res => {
        return res.json();
      });
  }
}
