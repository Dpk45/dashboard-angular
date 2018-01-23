import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';


@Injectable()
export class OrdersService {

  private baseUrl = 'http://localhost:3000/3.0';
  constructor(private _httpClient: HttpClient, private _http: Http) {

  }

  // get list of orders
  getOrders(brand) {
    brand = brand + '_dev';
    return this._http.get(this.baseUrl + '/orders/?key=' + brand).map((res: any) => {
      return res.json();
    });
  }

  // get order by order_id
  getOrderByOrderId(brand, order_id) {
    brand = brand + '_dev';
    return this._httpClient.get(this.baseUrl + '/orders/' + order_id + '/?key=' + brand).map((res: any) => {
      return res;
    });
  }

  // update order
  updateOrder(brand, order_id, data) {
    brand = brand + '_dev';
    return this._httpClient.put(this.baseUrl + '/orders/' + order_id + '/?key=' + brand, data).map((res: any) => {
      return res;
    });
  }

  // send to Lab after order creation
  sendToLab(brand, order_id, lab, itemId, data) {
    brand = brand + '_dev';
    const _path = this.baseUrl + '/orders/' + order_id + '/eyewear/send_to_lab/?key=' + brand + '&lab=' + lab + '&items=' + itemId;
    return this._httpClient.post(_path, data).map((res: any) => {
      return res;
    });
  }

  // received by lab
  receivedByLab(brand, order_id, itemId, data) {
    brand = brand + '_dev';
    const _path = this.baseUrl + '/orders/' + order_id + '/eyewear/received_by_lab/?key=' + brand + '&lab_order_number='
      + order_id + '&items=' + itemId;
    return this._httpClient.post(_path, data).map((res: any) => {
      return res;
    });
  }

  // Lab finished processing
  labFinishedProcessing(brand, order_id, itemId, data) {
    brand = brand + '_dev';
    const _path = this.baseUrl + '/orders/' + order_id + '/eyewear/lab_finished_processing/?key=' + brand + '&items=' + itemId;
    return this._httpClient.post(_path, data).map((res: any) => {
      return res;
    });
  }

  // Received from lab
  receiveFromLab(brand, order_id, itemId, data) {
    brand = brand + '_dev';
    const _path = this.baseUrl + '/orders/' + order_id + '/eyewear/receive_from_lab/?key=' + brand + '&items=' + itemId;
    return this._httpClient.post(_path, data).map((res: any) => {
      return res;
    });
  }

  // Return Item
  returnItem(brand, order_id, itemId, reason, description, data) {
    brand = brand + '_dev';
    const _path = this.baseUrl + '/orders/' + order_id + '/eyewear/authorize_return/?key=' + brand +
      '&items=' + itemId + '&reason=' + reason + '&description=' + description;
    return this._httpClient.post(_path, data).map((res: any) => {
      return res;
    });
  }

  // Refund
  refund(brand, order_id, itemId, reason, description, amount, data) {
    brand = brand + '_dev';
    const _path = this.baseUrl + '/orders/' + order_id + '/refund/?key=' + brand +
      '&items=' + itemId + '&reason=' + reason + '&description=' + description + '&amount=' + amount;
    return this._httpClient.post(_path, data).map((res: any) => {
      return res;
    });
  }

  // Cancel Item
  cancelItem(brand, order_id, itemId, reason, description, data) {
    brand = brand + '_dev';
    const _path = this.baseUrl + '/orders/' + order_id + '/eyewear/cancel/?key=' + brand +
      '&items=' + itemId + '&reason=' + reason + '&description=' + description;
    return this._httpClient.post(_path, data).map((res: any) => {
      return res;
    });
  }

  // Issue store credit
  issueStoreCredit(brand, order_id, itemId, reason, description, amount, data) {
    brand = brand + '_dev';
    const _path = this.baseUrl + '/orders/' + order_id + '/store_credit/?key=' + brand +
      '&item_index=' + itemId + '&reason=' + reason + '&description=' + description + '&amount=' + amount;
    return this._httpClient.post(_path, data).map((res: any) => {
      return res;
    });
  }

  // Add Internal note
  addInternalNote(brand, order_id, data) {
    brand = brand + '_dev';
    return this._httpClient.post(this.baseUrl + '/orders/' + order_id + '/internal_notes/?key=' + brand, data).map((res: any) => {
      return res;
    });
  }
}
