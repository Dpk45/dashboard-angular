import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Http, Response, Headers, RequestOptions, ResponseContentType} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ReportService {
  private baseUrl = "http://localhost:3000/3.0";
  constructor(private _http: Http, private _httpClient: HttpClient) {

  }

getOrderListService(brand) {
  brand = brand + "_dev";
  const _path: string = (this.baseUrl + '/orders?key=' + brand)
  return this._http.get(_path)
  .map((res:any) => {
    return res.json();
  });
}

getEyewearSalesReport(startDate, endDate, brand) {
  brand = brand + "_dev";
  const _path: string = (this.baseUrl + '/reports/eyewear?key=' + brand + '&start_date=' + startDate + '&end_date=' + endDate)
  return this._httpClient.get(_path)
  .map((res:any) => {
    return res;
  });
}

getEyewearSalesFinanaceReport(startDate, endDate, brand) {
  brand = brand + "_dev";
  const _path: string = (this.baseUrl + '/reports/eyewear/finance?key=' + brand + '&start_date=' + startDate + '&end_date=' + endDate)
  return this._httpClient.get(_path)
  .map((res:any) => {
    return res;
  });
}

getHtkSalesReport(startDate, endDate, brand) {
  brand = brand + "_dev";
  const _path: string = (this.baseUrl + '/reports/htk?key=' + brand + '&start_date=' + startDate + '&end_date=' + endDate)
  return this._httpClient.get(_path)
  .map((res:any) => {
    return res;
  });
}

getinventoryReport(brand) {
  brand = brand + "_dev";
  const _path: string = (this.baseUrl + '/reports/eyewear_inventory?key=' + brand)
  return this._httpClient.get(_path)
  .map((res:any) => {
    return res;
  });
}

gethtkPastDueReport(startDate, endDate, brand) {
  brand = brand + "_dev";
  const _path: string = (this.baseUrl + '/reports/htk_pastdue?key=' + brand + '&start_date=' + startDate + '&end_date=' + endDate)
  return this._httpClient.get(_path)
  .map((res:any) => {
    return res;
  });
}

getProductIdmapping(brand) {
  brand = brand + "_dev";
  const _path: string = (this.baseUrl + '/reports/product_id_mapping?key=' + brand)
  return this._httpClient.get(_path)
  .map((res:any) => {
    console.log("resposmene>>>>>>>>>>>>>>>>>>>",res)
    return res;
  });
}

getStyleMaster(brand){
  brand = brand + "_dev";
  const _path: string = (this.baseUrl + '/reports/style_master?key=' + brand)
  return this._httpClient.get(_path)
  .map((res:any) => {
    console.log("resposmene>>>>>>>>>>>>>>>>>>>",res)
    return res;
  });
}

getOrderByOrderId(orderId, brand){
  brand = brand + "_dev";
  const _path: string = (this.baseUrl + '/orders/' + orderId + '?key=' + brand)
  return this._httpClient.get(_path)
  .map((res:any) => {
    return res;
  });
}
}
