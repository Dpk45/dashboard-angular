import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { DashUserService } from "../../services/dashUser.service"
import { OrdersService } from "../../services/orders-service.service"

@Component({
  selector: 'app-htk-component',
  templateUrl: './htk-component.component.html',
  styleUrls: ['./htk-component.component.css']
})
export class HtkComponent implements OnInit {

  current_user: any
  dashUser: any
  orders :any
  brand_orders : any = { }

  constructor(private _ordersService:OrdersService, private _dashUserService: DashUserService, private route: ActivatedRoute, private router: Router) { 
    this.current_user = JSON.parse(localStorage.getItem("current_user"));
  }

  ngOnInit() {

    this._dashUserService.getDashUserByEmail(this.current_user.email).subscribe((res) => {
      this.dashUser = res;
      for(let i=0; i < res.brands.length; i++){
        let brand = res.brands[i].brand;
        this.getOrders(brand)
      }
      console.log("brand_orders >>>>>>>>>>", this.brand_orders)
    })
    
  }


  getOrders(brand){
    this._ordersService.getOrders(brand).subscribe((res:any)=>{
      if(res.code==200){
          this.brand_orders[brand] = []
          this.brand_orders[brand]=res.data
      }
    })
  }
}
