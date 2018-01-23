import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { StorageService } from './storage.service'

@Injectable()
export class DashUserService {
    private baseUrl = 'http://localhost:3000/3.0';
    constructor(private _httpClient: HttpClient, private _http: Http, private _storageService: StorageService) {


    }

    // get list of dashboard User
    getDashUsers() {
        return this._httpClient.get(this.baseUrl + '/dashboard/users/?key=DASHBOARD')
            .map((res: any) => {
                return res.data;
            });
    }

    // get dashboard user by email
    getDashUserByEmail(email) {
        return this._httpClient.get(this.baseUrl + '/dashboard/users/' + email + '?key=DASHBOARD')
            .map((res: any) => {
                if (res.code === 200) {
                    return res.data;
                }
            });
    }

    // update dashboard user by email
    updateDashUser(email, data) {
        return this._httpClient.put(this.baseUrl + '/dashboard/users/' + email + '?key=DASHBOARD', data)
            .map((res: any) => {
                return res.data;
            });
    }
}
