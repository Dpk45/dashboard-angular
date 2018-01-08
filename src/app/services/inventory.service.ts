import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Http, Response, Headers, RequestOptions, ResponseContentType} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class InventoryService {
  private baseUrl = "http://localhost:3000/3.0";
  constructor(private _http: Http, private _httpClient: HttpClient) {

  }

// get Inventory by productId
  getInventoryByProduct(productId, brand) {
    brand = brand + "_dev";
    const _path: string = (this.baseUrl + '/products/' + productId + '/get_inventory?key=' + brand)
    return this._httpClient.get(_path)
    .map((res:any) => {
      return res;
    });
  }

// get one product
  getProductByProduct(productId, brand) {
    brand = brand + "_dev";
    const _path: string = (this.baseUrl + '/products/?key=' + brand + '&product_id=' + productId)
    return this._httpClient.get(_path)
    .map((res:any) => {
      return res;
    });
  }

// update inventory by product_id
  updateInventoryByProduct(warehouse, htk_quantity, tro, kmarsoptical, productId, brand) {
    brand = brand + "_dev";
    const _path: string = (this.baseUrl + '/products/'+ productId + '/adjust_inventory?key=' + brand)
    let body = JSON.stringify({'warehouse': warehouse, 'htk_quantity': htk_quantity, 'kmarsoptical': kmarsoptical, 'tro': tro})
    return this._httpClient.put(_path, body)
    .map((res:any) => {
      return res;
    });
  }

  uploadInventory(file, brand) {
    file = btoa(file);
    brand = brand + "_dev";
    const _path: string = (this.baseUrl + '/products/update_inventory?key=' + brand)
    let body = JSON.stringify({'file': file})
    return this._httpClient.put(_path, body)
    .map((res:any) => {
      return res;
    });
  }
}
