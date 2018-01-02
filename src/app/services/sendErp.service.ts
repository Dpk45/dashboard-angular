import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Http, Response, Headers, RequestOptions, ResponseContentType} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ErpService {
  private baseUrl = "http://localhost:3000/3.0";
  constructor(private _http: Http, private _httpClient: HttpClient) {

  }
}
