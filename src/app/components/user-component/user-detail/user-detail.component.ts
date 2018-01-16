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
  constructor(private _userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.brand = params.brand
      console.log(" params vvvvvvvvvv", params)
      if (params.email && params.brand) {
        this.getUserByEmail(params.email, params.brand)
      }
    });

  }


  getUserByEmail(email, brand) {
    this._userService.getUserByEmail(email, brand).subscribe(user => {
      // console.log("<<<<<<<<<<< user data by email >>>>>>>>>", user)
      this.user = user;
      this.isSingleUser = true;
      console.log("user data by email >>>>>>>>>", user)
    })

    this._userService.getUserOrders(email, brand).subscribe(res => {
      console.log("<<<<<<<<<<< getUserOrders by email >>>>>>>>>", res)
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

  updateUser(data) {
    console.log("inside update user function...............", data)
    this._userService.updateUser(data.email, this.brand, data).subscribe(res => {
      console.log("user upsdated successfully ......", res);
      this.isEditUser = false;
      this.isSingleUser = true;

    })
  }

  resetPassword(email) {
    console.log("inside resetPassword function...............")
    this._userService.resetPassword(email, this.brand).subscribe(res => {
      console.log("resetPassword link sent successfully ......", res);
      this.isEditUser = false;
      this.isSingleUser = true;
    })
  }

}
