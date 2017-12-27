import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, ResponseContentType } from "@angular/http";
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LetterpressService {

  private baseUrl = "http://localhost:3000/3.0";

  constructor(private _httpClient:HttpClient, private _http:Http) {

  }

  getTemplates(brand) {
    brand = brand + "_dev";
    return this._httpClient.get(this.baseUrl+"/mail/templates/?key="+brand).map((res: any)=>{
      return res.data;
    })
  }

  getTemplate(templateName, brand) {
    brand = brand + "_dev";
    return this._httpClient.get(this.baseUrl+"/mail/templates/templateName?key="+brand).map((res: any)=>{
      return res.data;
    })
  }

  createTemplate(data, brand) {
     brand = brand + "_dev";
    return this._httpClient.post(this.baseUrl+"/mail/templates/?key="+brand, data).map((res: any)=>{
      return res.data;
    })
  }

  updateTemplate(data, brand) {
    brand = brand + "_dev";
    return this._httpClient.put(this.baseUrl+"/mail/templates/templateName?key="+brand, data).map((res: any)=>{
      return res.data;
    })
  }

   getCommonTemplates(brand) {
    brand = brand + "_dev";
    return this._httpClient.get(this.baseUrl+"/mail/templates/common?key="+brand).map((res: any)=>{
      return res.data;
    })
  }

  getCommonTemplate(templateName, brand) {
    brand = brand + "_dev";
    return this._httpClient.get(this.baseUrl+"/mail/templates/common/templateName?key="+brand).map((res: any)=>{
      return res.data;
    })
  }

  createCommonTemplate(data, brand) {
     brand = brand + "_dev";
    return this._httpClient.post(this.baseUrl+"/mail/templates/common?key="+brand, data).map((res: any)=>{
      return res.data;
    })
  }

  updateCommonTemplate(data, brand) {
    brand = brand + "_dev";
    return this._httpClient.put(this.baseUrl+"/mail/templates/common/templateName?key="+brand, data).map((res: any)=>{
      return res.data;
    })
  }

}
