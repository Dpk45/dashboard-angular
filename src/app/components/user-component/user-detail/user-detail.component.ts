import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "../../../services/user.service"

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  brand: any
  user: any
  orders: any
  isSingleUser: boolean;
  isEditUser: boolean;
  isReset: boolean;
  constructor(private _userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.brand = params.brand
      if (params.email && params.brand) {
        this.getUserByEmail(params.email, params.brand)
      }
    });

  }

  // get one user by email
  getUserByEmail(email, brand) {
    this._userService.getUserByEmail(email, brand).subscribe(res => {
      if(res.code==200){
        this.user = res.data;
        this.isSingleUser = true;
      }
      
    })

    this._userService.getUserOrders(email, brand).subscribe(res => {
      this.orders = res
    })
  }

  editUser(email) {
    this.isSingleUser = false;
    this.isEditUser = true
  }

  cancel() {
    this.isEditUser = false;
    this.isSingleUser = true;
  }

  // update user data
  updateUser(data) {
    console.log("in update user", data)
    this._userService.updateUser(data.email, this.brand, data).subscribe(res => {
      console.log("res update user ", res)
      if (res.code == 200) {
        this.isEditUser = false;
        this.isSingleUser = true;
      }
    })
  }

  // reset password function
  resetPassword(email) {
    console.log("inside resetPassword function...............")
    this._userService.resetPassword(email, this.brand).subscribe(res => {
      console.log("resetPassword link sent successfully ......", res);
      this.isEditUser = false;
      this.isSingleUser = true;
      this.isReset = true;
    })
  }

}
