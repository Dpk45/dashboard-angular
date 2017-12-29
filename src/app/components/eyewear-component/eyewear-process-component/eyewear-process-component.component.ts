import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { DashUserService } from "../../../services/dashUser.service"

@Component({
  selector: 'app-eyewear-process-component',
  templateUrl: './eyewear-process-component.component.html',
  styleUrls: ['./eyewear-process-component.component.css']
})
export class EyewearProcessComponent implements OnInit {

  brand: any
  current_user: any
  dashUser: any

  constructor(private _dashUserService: DashUserService, private route: ActivatedRoute, private router: Router) { 
    this.current_user = JSON.parse(localStorage.getItem("current_user"));
  }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      console.log("params >>>", params)
      if(params.brand){
        this.brand = params.brand
      }})
      this._dashUserService.getDashUserByEmail(this.current_user.email).subscribe((res) => {
        this.dashUser = res;
      })
      this.getOrders();
  }



  getOrders(){
    
  }
}
