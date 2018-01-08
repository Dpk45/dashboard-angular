import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Http, Response, Headers, RequestOptions, ResponseContentType} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductService {
  private baseUrl = "http://localhost:3000/3.0";
  constructor(private _http: Http, private _httpClient: HttpClient) {

  }

  getProducts(brand) {
    brand = brand + "_dev";
    const _path: string = (this.baseUrl + '/products?key=' + brand)
    return this._httpClient.get(_path)
    .map((res: any) => {
      return res;
    });
  }

  getProductById(brand, productId) {
    brand = brand + "_dev";
    const _path: string = (this.baseUrl + '/products?key=' + brand + '&product_id=' + productId)
    return this._httpClient.get(_path)
    .map((res: any) => {
      return res;
    });
  }
}
