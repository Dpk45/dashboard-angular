import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LetterPressService {
  private baseUrl = 'http://localhost:3000/3.0';
  constructor(private _http: Http, private _httpClient: HttpClient) {

  }

  // get templates
  getTemplate(brand) {
    brand = brand + '_dev';
    const _path: string = (this.baseUrl + '/mail/templates?key=' + brand);
    return this._httpClient.get(_path)
      .map((res: any) => {
        return res;
      });
  }

  // get one template
  findOneTemplate(name, brand) {
    brand = brand + '_dev';
    const _path: string = (this.baseUrl + '/mail/templates/' + name + '?key=' + brand);
    return this._httpClient.get(_path)
      .map((res: any) => {
        return res;
      });
  }

  // update one template
  updateOneTemplate(subject, fromName, fromEmail, text, html, name, brand) {
    brand = brand + '_dev';
    const _path: string = (this.baseUrl + '/mail/templates/' + name + '?key=' + brand),
      body: any = JSON.stringify({
        'name': name, 'subject': subject, 'from_name': fromName, 'from_email': fromEmail, 'text': text, 'html': html
      });
    return this._httpClient.put(_path, body)
      .map((res: any) => {
        return res;
      });
  }

  // get common template
  getCommonTemplate(brand) {
    brand = brand + '_dev';
    const _path: string = (this.baseUrl + '/mail/templates/common?key=' + brand);
    return this._httpClient.get(_path)
      .map((res: any) => {
        return res;
      });
  }

  // get one common template
  findOneCommonTemplate(name, brand) {
    brand = brand + '_dev';
    const _path: string = (this.baseUrl + '/mail/templates/common/' + name + '?key=' + brand);
    return this._httpClient.get(_path)
      .map((res: any) => {
        return res;
      });
  }

  // update commontemplate
  updateCommonTemplate(content, name, brand) {
    brand = brand + '_dev';
    const _path: string = (this.baseUrl + '/mail/templates/common/' + name + '?key=' + brand),
      body: any = JSON.stringify({ 'name': name, 'content': content });
    return this._httpClient.put(_path, body)
      .map((res: any) => {
        return res;
      });
  }
}
