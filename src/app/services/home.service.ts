import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import 'rxjs/add/operator/map';
// var fs = require('fs');
// import * as fs from 'fs';
// const fs = require('fs-extra');

@Injectable()
export class HomeService {
  private baseUrl = 'http://localhost:3000/3.0';
  constructor(private _http: Http, private _httpClient: HttpClient) {

  }

  // create upc_code
  createUpcCode(batchname, file) {
    const _path: string = (this.baseUrl + '/upc_codes?key=DASHBOARD');
    const body: any = JSON.stringify({ 'batch_name': batchname, 'file': file.data });
    return this._httpClient.post(_path, body)
      .map(res => {
        return res;
      });
  }


  // send upc_code_report
  upcCodeReport(reportbatchname) {
    const _path: string = (this.baseUrl + '/reports/upc_codes?key=DASHBOARD&batch_name=' + reportbatchname);
    return this._httpClient.get(_path)
      .map(res => {
        return res;
      });
  }

  // get list of batch_name
  getBatchName() {
    const _path: string = (this.baseUrl + '/upc_codes/batch_names?key=DASHBOARD');
    return this._httpClient.get(_path)
      .map(res => {
        return res;
      });
  }
}
