import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashAuthService } from "../../services/dashAuth.service"
import { DashUserService } from "../../services/dashUser.service"
import { UserService } from "../../services/user.service"

@Component({
    moduleId:module.id,
  selector: 'header',
  templateUrl: "header.component.html",
  styleUrls:["header.component.css"]
})
export class HeaderComponent implements OnInit {
  current_user: any;
  dashUser: any;
  constructor(private router:Router, private _dashAuthService: DashAuthService, private _dashUserService: DashUserService, private _userService: UserService){
      this.current_user = JSON.parse(localStorage.getItem("current_user"));
    }

  ngOnInit(){
    this._dashUserService.getDashUserByEmail(this.current_user.email).subscribe((res) => {
        this.dashUser = res;
      })
  }

// dashboardUser logout
  private logout() {
     this._dashAuthService.logoutDashUser(this.current_user.email).subscribe(res => {
      this.router.navigate(['']);
     }, (err) => {
          this.router.navigate(['/error']);
     })
  }

// get list of users
  getUsers(brand) {
    this._userService.getUsers(brand).subscribe(res => {
      // this.router.navigate(['/user'], { queryParams: { user: res } });
    })
  }
}
