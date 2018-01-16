import { Component, OnInit } from '@angular/core';
// import {userdata} from  '../../services/userdata.service';
import { Router } from '@angular/router';
import { DashAuthService } from "../../services/dashAuth.service"
import { StorageService } from "../../services/storage.service"

@Component({
    moduleId: module.id,
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']

})
export class LoginComponent implements OnInit{

    private email: string;
    private password: string;
    parentRouter: Router;
    returnUrl: any;

    constructor(private router: Router, private _dashAuthService: DashAuthService, private _storageService: StorageService) {

    }

    ngOnInit(){

    }

    private dashLogin(email, password) {
        this.email = email.value;
        this.password = password.value
        let data = {
            email: this.email,
            password: this.password
        }
        console.log("data >>>>", data)
        this._dashAuthService.loginDashUser(data).subscribe(
            res => {
                console.log("res >>>>", res)
                if (res.code == 200) {
                    console.log("in if >>>>>>>>")
                    this._storageService.setItem("current_user", JSON.stringify(res.data))
                    this.router.navigate(['/home']);
                    location.reload();
                }
            },
            (err) => {
                console.log("ERR>>>>>", err)
                this.router.navigate(['/error']);
            }
        )
    }
}
