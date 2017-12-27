import  {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions, ResponseContentType} from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class StorageService{
    constructor(){

    }

     setItem(key , value){
        localStorage.setItem(key, value);
    }

     getItem(key){
        let data = localStorage.getItem(key);
        return data;
    }

     removeItem(key){
        localStorage.removeItem(key);
    }

}