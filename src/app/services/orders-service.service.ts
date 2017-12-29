import  {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions, ResponseContentType} from "@angular/http";
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';


@Injectable()
export class OrdersService {

  private baseUrl = "http://localhost:3000/3.0";
    constructor(private _httpClient:HttpClient, private _http:Http){
      
    }

  getOrders(){
    return this._http.get(this.baseUrl+"/orders/?key=DASHBOARD").map((res:any) => {
            return res.json()
          })
      }
}
