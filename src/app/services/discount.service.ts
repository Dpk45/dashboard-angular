import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Http, Response, Headers, RequestOptions, ResponseContentType} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DiscountService {
  private baseUrl = "http://localhost:3000/3.0";
  constructor(private _http: Http, private _httpClient: HttpClient) {

  }

// create discount_code
  createDiscount(discount_code, discount_type, amount1, quantity, discount_reason, date, brand) {
    brand = brand + "_dev";
    const _path: string = (this.baseUrl + '/discount_codes?key=' + brand),
    amount = parseInt(amount1);
    quantity = parseInt(quantity);
    let body: any = JSON.stringify({'discount_code': discount_code, 'discount_type': discount_type, 'amount': amount, 'quantity': quantity, 'discount_reason': discount_reason, 'expiration_date': date })
    return this._httpClient.post(_path, body)
    .map(res => {
      return res;
    });
  }

// get discount_codes
  getDiscount(brand){
    brand = brand + "_dev";
    const _path: string = (this.baseUrl + '/discount_codes?key=' + brand)
    return this._httpClient.get(_path)
    .map((res:any) => {
      //console.log("response >>>>>>>>>>>>>>",res)
      return res;
    });
  }

// get discount_code
  findOneDiscount(discount_code, brand){
    brand = brand + "_dev";
    const _path: string = (this.baseUrl + '/discount_codes/' + discount_code + '?key=' + brand)
    return this._httpClient.get(_path)
    .map((res:any) => {
      return res;
    });
  }
  updateOneDiscount(discount_code, discount_type, amount1, quantity, discount_reason, date, brand) {
    brand = brand + "_dev";
    const _path: string = (this.baseUrl + '/discount_codes/' + discount_code + '?key=' + brand),
    amount = parseInt(amount1);
    quantity = parseInt(quantity);
    let body: any = JSON.stringify({'discount_code': discount_code, 'discount_type': discount_type, 'amount': amount, 'quantity': quantity, 'discount_reason': discount_reason, 'expiration_date': date })
    return this._httpClient.put(_path, body)
    .map((res:any) => {
      return res;
    });
  }
}
