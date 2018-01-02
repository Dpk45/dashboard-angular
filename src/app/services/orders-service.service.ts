import  {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions, ResponseContentType} from "@angular/http";
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';


@Injectable()
export class OrdersService {

  private baseUrl = "http://localhost:3000/3.0";
    constructor(private _httpClient:HttpClient, private _http:Http){
      
    }

  getOrders(brand){
    brand = brand+"_dev"
    return this._http.get(this.baseUrl+"/orders/?key="+brand).map((res:any) => {
            return res.json()
          })
      }

      getOrderByOrderId(brand, order_id){
        brand = brand + "_dev"
        return this._httpClient.get(this.baseUrl+"/orders/"+order_id+"/?key="+brand).map((res: any)=>{
          return res;
        })
      }
}
