import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, ResponseContentType } from "@angular/http";
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { StorageService } from "./storage.service"

@Injectable()
export class UserService {
    private baseUrl = "http://localhost:3000/3.0";
    constructor(private _httpClient: HttpClient, private _http: Http, private _storageService: StorageService) {


    }

    getUsers(brand) {
        brand = brand + "_dev";
        return this._http.get(this.baseUrl + "/users/?key=" + brand)
            .map((res: any) => {
                return res.json()
            })
    }

    getUserByEmail(email, brand) {
        brand = brand + "_dev";
        return this._httpClient.get(this.baseUrl + "/users/" + email + "?key=" + brand)
            .map((res: any) => {
                    return res;
            })
    }

    updateUser(email, brand, data) {
        brand = brand + "_dev";
        return this._httpClient.put(this.baseUrl + "/users/" + email + "?key=" + brand, data)
            .map((res: any) => { return res; })
    }


    resetPassword(email, brand) {
        brand = brand + "_dev";
        return this._httpClient.post(this.baseUrl + "/users/" + email + "/forgot_password?key=" + brand, {}).map((res: any) => {
            return res.data;
        })
    }
    
    // createUser(){

    // }

    getUserOrders(email, brand) {
        brand = brand + "_dev";
        return this._httpClient.get(this.baseUrl + "/users/" + email + "/orders?key=" + brand).map((res: any) => {
            return res.data;
        })
    }

    updateRx(email, brand, rx_id, rxData) {
        brand = brand + "_dev"
        return this._httpClient.put(this.baseUrl + "/users/" + email + "/rx/" + rx_id + "?key=" + brand, rxData).map((res: any) => {
            return res.data;
        })
    }
}