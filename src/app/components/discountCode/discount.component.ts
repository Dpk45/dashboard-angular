import {Component, OnInit} from '@angular/core';
import {DiscountService} from '../../services/discount.service';
import { Router, ActivatedRoute} from '@angular/router';
// import * as moment from 'moment';
@Component({
  moduleId: module.id,
  selector : 'app-discount',
  templateUrl: 'discount.component.html'
})

export class DiscountComponent {
  private discount_code: any;
  private amount: any;
  private quantity: any;
  private discount_type: any;
  private discount_reason: any;
  private date: any;
  private dataValue: any;
  private oneDiscountCode : any;
  private updateDiscountCode : any;
  private token: any;
  private discount_list: any;
  private selectedValue: any = 10;
  brand: any;
  CurrentPageValue: any = 1;
  byDiscountCode: boolean;
  quantityAvailable: boolean = true;
  expirationDate: boolean = true;
  TodayDate:any;
  constructor(private route: ActivatedRoute, private _discountService: DiscountService, private router: Router) {
    //this.TodayDate = new Date();
}


  ngOnInit(){
    this.route.params.subscribe((params:any) => {
      this.brand = params.brand;
      this.getDiscounts();
    });
}

// get discount_code
getDiscounts(){
    //this.TodayDate =  moment(this.TodayDate).format('YYYY-MM-DD'),
    console.log("get discount++++++++++++++++++++++++++++++++++")
    this._discountService.getDiscount(this.brand).subscribe(res => {
      console.log("response >>>>>>>>>>>>>>>>>",res)
    this.discount_list = res.data;
    },
    (err) => {
      console.log('error>>>>>>>>>>>>', err);
    })
  }

// create discount code
  createDiscount(discount_code: any , discount_type: any, amount: any, quantity: any, discount_reason: any, date: any){
    this.discount_code = discount_code.value;
    this.discount_type = discount_type.value;
    this.amount = amount.value;
    this.quantity = quantity.value;
    this.discount_reason = discount_reason.value;
    this.date = date.value;
    this._discountService.createDiscount(this.discount_code, this.discount_type, this.amount, this.quantity, this.discount_reason, this.date, this.brand)
    .subscribe((res:any) => {
      if (res.code == 200) {
        this.router.navigate(['/discount', this.brand]);
      }
    },
    (err) => {
      console.log('error>>>>>>>>>>>>', err);
    }
  );
}

// findOne discount_code
foundDiscountCode(discount_code: any){
  this._discountService.findOneDiscount(discount_code, this.brand)
  .subscribe(res =>{
    this.oneDiscountCode = res.data;
    this.byDiscountCode = true;
  },
  (err) => {
    console.log('error>>>>>>>>>>>>', err);
  }
);
}

// update discount_code
updateDiscount(discount_type: any, amount:any, quantity:any, discount_reason:any, expiration_date:any){
  this.updateDiscountCode = this.oneDiscountCode.discount_code;
  this.discount_type = discount_type.value;
  this.amount = amount.value;
  this.quantity = quantity.value;
  this.discount_reason = discount_reason.value;
  this.date = expiration_date.value;
  this._discountService.updateOneDiscount(this.updateDiscountCode, this.discount_type, this.amount, this.quantity, this.discount_reason, this.date, this.brand)
  .subscribe(res => {
    if (res.code == 200) {
      this.byDiscountCode = false;
    }
  },
  (err) => {
    console.log('error>>>>>>>>>>>>', err);
  }
);
}
}
