import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashAuthService } from "../../services/dashAuth.service"
import { DashUserService } from "../../services/dashUser.service"
import { UserService } from "../../services/user.service"

@Component({
    moduleId:module.id,
  selector: 'header',
  templateUrl: "header.component.html",
})
export class HeaderComponent implements OnInit {
  current_user: any;
  dashUser: any;
  constructor(private router:Router, private _dashAuthService: DashAuthService, private _dashUserService: DashUserService, private _userService: UserService){
      this.current_user = JSON.parse(localStorage.getItem("current_user"));

  }

  ngOnInit(){
    this._dashUserService.getDashUserByEmail(this.current_user.email).subscribe((res) => {
        // res = JSON.stringify(res);
        // console.log("dddddddddddddd  res >>>>>>>>", res)
        this.dashUser = res;
        // console.log("this.user >>>>>>>>", this.user)
      })
  }

  private logout(){
     this._dashAuthService.logoutDashUser(this.current_user.email).subscribe(res => {
         console.log("res in logout component.ts >>>>", res)
      this.router.navigate(['']);
     },
     err => {
          console.log("ERR>>>>>", err)
          this.router.navigate(['/error']);
     })
  }

  getUsers(brand){
    console.log("brand >>", brand)
    this._userService.getUsers(brand).subscribe(res => {
      console.log("resx Dddddddddddddddddddd", res)
      // this.router.navigate(['/user'], { queryParams: { user: res } });
      console.log("res.data >>>>", res)
    })
  }

 }