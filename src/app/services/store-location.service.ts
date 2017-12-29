import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, ResponseContentType } from "@angular/http";
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class StoreLocationService {

  private baseUrl = "http://localhost:3000/3.0";

  constructor(private _httpClient:HttpClient, private _http:Http) {

  }

  getStoreLocations(brand) {
    brand = brand + "_dev";
    return this._http.get(this.baseUrl+"/store_locations/?key="+brand).map((res: any)=>{
      return res.json();
    })
  }

  getStoreLocation(kiosk_id, brand) {
    brand = brand + "_dev";
    return this._httpClient.get(this.baseUrl+"/store_locations/"+kiosk_id+"?key="+brand).map((res: any)=>{
      return res.data;
    })
  }

  createStoreLocation(data, brand) {
     brand = brand + "_dev";
    return this._httpClient.post(this.baseUrl+"/store_locations/?key="+brand, data).map((res: any)=>{
      return res.data;
    })
  }

  updateStoreLocation(data, kiosk_id, brand) {
    brand = brand + "_dev";
    return this._httpClient.put(this.baseUrl+"/store_locations/"+kiosk_id+"?key="+brand, data).map((res: any)=>{
      return res.data;
    })
  }


}
