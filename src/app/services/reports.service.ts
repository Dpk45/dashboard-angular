import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Http, Response, Headers, RequestOptions, ResponseContentType} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ReportService {
  private baseUrl = "http://localhost:3000/3.0";
  constructor(private _http: Http, private _httpClient: HttpClient) {

  }

getOrderListService(brand){
  brand = brand + "_dev";
  const _path: string = (this.baseUrl + '/orders?key=' + brand)
  return this._http.get(_path)
  .map((res:any) => {
    return res.json()
  });
}
}
