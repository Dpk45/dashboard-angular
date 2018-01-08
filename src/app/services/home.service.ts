import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Http, Response, Headers, RequestOptions, ResponseContentType} from '@angular/http';
import 'rxjs/add/operator/map';
//var fs = require('fs');
// import * as fs from 'fs';
//const fs = require('fs-extra');

@Injectable()
export class HomeService {
  private baseUrl = "http://localhost:3000/3.0";
  constructor(private _http: Http, private _httpClient: HttpClient) {

  }

// create upc_code
  createUpcCode(batchname, file) {
    console.log('data from file is coming>>>>>>>>>>>>>. now convert it into base64>................', file)
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = function () {
  //    console.log("resulted data>.......................",reader.result);
  //    file = reader.result;
  //   // const _path: string = (this.baseUrl + '/upc_codes?key=DASHBOARD'),
  //     const _path: string = ('http://localhost:3000/3.0/upc_codes?key=DASHBOARD'),
  //    body: any = JSON.stringify({'batch_name': batchname, 'file': file})
  //    console.log("body>>>>>>>>>>>>>>>++++++++++++++++++++", body)
  //  //  console.log("_path>>>>>>>>>>>>>>>>>>>>>>>>>>>>",_path)
  //    return this._httpClient.post(_path, body)
  //    .map(res => {
  //      return res;
  //    });
   //
  //  };
 //  console.log(" console.log(this.fs);>>>>>>>>>>>>>>>>>>>>>>>",fs)
 // const data = fs.readFileSync(file.name, 'base64');
  // console.log('seeeeeeeeeeeeeeeeeeeeeeeeee...............', data)
      const _path: string = (this.baseUrl + '/upc_codes?key=DASHBOARD'),
      body: any = JSON.stringify({'batch_name': batchname, 'file': file})
      console.log("body>>>>>>>>>>>>>>>++++++++++++++++++++", body)
    //  console.log("_path>>>>>>>>>>>>>>>>>>>>>>>>>>>>",_path)
      return this._httpClient.post(_path, body)
      .map(res => {
        return res;
      });

  }

  // send upc_code_report
  upcCodeReport(reportbatchname) {
        const _path: string = (this.baseUrl + '/reports/upc_codes?key=DASHBOARD&batch_name=' + reportbatchname)
        return this._httpClient.get(_path)
        .map(res => {
          return res;
        });
  }
}
