import  {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions, ResponseContentType} from "@angular/http";
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';


@Injectable()
export class OrdersServiceService {

  private baseUrl = "http://localhost:3000/3.0";
    constructor(private _httpClient:HttpClient, private _http:Http){
      
    }

}
