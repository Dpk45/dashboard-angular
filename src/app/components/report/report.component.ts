import {Component, OnInit} from '@angular/core';
import { DashUserService } from '../../services/dashUser.service';
import { DashAuthService } from '../../services/dashAuth.service';
import { ReportService } from '../../services/reports.service';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  moduleId: module.id,
  selector : 'app-report',
  templateUrl: 'report.component.html'
})

export class ReportComponent {
  current_user: any;
  dashUser: any;
  brand: any;
  isSuccess: boolean;
  order_id: any;
  foundOrder: boolean;
constructor(private router:Router, private _reportService: ReportService, private _dashAuthService: DashAuthService, private _dashUserService: DashUserService) {
  this.current_user = JSON.parse(localStorage.getItem("current_user"));
}
ngOnInit(){
  this._dashUserService.getDashUserByEmail(this.current_user.email).subscribe((res) => {
        this.dashUser = res;
    })
}

getProductIdmapping(brand) {
  this.brand = brand;
  this._reportService.getProductIdmapping(this.brand).subscribe(res => {
//console.log("response >>>>>>>>>>>>>><<<<<<<<<<<<<<<",res)
if(res.code == 200){
//  console.log("inside of if condition>>>>>>>>>>>>>>>>...")
  this.isSuccess = true
}
  },
  (err) => {
    console.log('error>>>>>>>>>>>>', err);
  })
}

getStyleMaster(brand) {
  this.brand = brand;
  this._reportService.getStyleMaster(this.brand).subscribe(res => {
console.log("response >>>>>>styleeeeeeeeeeeeeeee<",res)
if(res.code == 200){
  this.isSuccess = true
}
},
  (err) => {
    console.log('error>>>>>>>>>>>>', err);
  })
}

getOrderByOrderId(order_id ,brand){
  this.order_id = order_id.value;
  this.brand = brand;
  this._reportService.getOrderByOrderId(this.order_id, this.brand).subscribe(res => {
console.log("response getOrderByOrderIdstyleeeeeeeeeeeeeeee<", JSON.stringify(res))
if(res.code == 200){
  this.foundOrder = true;
}
},
  (err) => {
    console.log('error>>>>>>>>>>>>', err);
  })


}
}
