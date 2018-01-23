import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { StorageService } from './storage.service';

@Injectable()
export class DashAuthService {
    private baseUrl = 'http://localhost:3000/3.0';
    constructor(private _httpClient: HttpClient, private _http: Http, private _storageService: StorageService) {


    }

    // Authentication
    loginDashUser(data) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        return this._http.post(this.baseUrl + '/dashboard/users/auth/?key=DASHBOARD', JSON.stringify(data), options)
            .map(res => res.json());
    }

    // logout dashboard user
    logoutDashUser(email) {
        return this._httpClient.post(this.baseUrl + '/dashboard/users/logout/' + email + '?key=DASHBOARD', {})
            .map((res: any) => {
                if (res.code === 200) {
                    this._storageService.removeItem('current_user');
                    // res.data;
                }
            });
    }
}
