import {Component, OnInit} from '@angular/core';
import {DiscountService} from '../../services/discount.service';
import { Router, ActivatedRoute} from '@angular/router';
import * as moment from 'moment';
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
  quantityAvailable: boolean = false;
  expirationDate: boolean = false;
  TodayDate: any = new Date();
  isSuccess: boolean;
  constructor(private route: ActivatedRoute, private _discountService: DiscountService, private router: Router) {

  }

  ngOnInit(){
    this.route.params.subscribe((params:any) => {
      this.brand = params.brand;
      this.getDiscounts();
      if(params.discount_code) {
        this.discount_code = params.discount_code;
        this.foundDiscountCode(this.discount_code);
      }
    });
  }

  // get discount_code
  getDiscounts(){
    this._discountService.getDiscount(this.brand).subscribe(res => {
      this.discount_list = res.data;
    },
    (err) => {
      console.log('error>>>>>>>>>>>>', err);
    })
  }

// check for quantity available
  qtyAvailable(quantityAvailable) {
    if (!quantityAvailable) {
      const qtyAvailable: any = [];
      for (let i = 0; i < this.discount_list.length; i++) {
        if (this.discount_list[i].quantity > 0) {
          qtyAvailable.push(this.discount_list[i]);
        }
      }
      this.discount_list = qtyAvailable;
    } else {
      this.getDiscounts();
    }
  }

// check expiation date 
  expiredDate(expirationDate) {
    this.TodayDate =  moment(this.TodayDate).format('YYYY-MM-DD');
    if (!expirationDate) {
      const NotExpired: any = [];
      for (let i = 0; i < this.discount_list.length; i++) {
        if (this.discount_list[i].expiration_date >= this.TodayDate) {
          NotExpired.push(this.discount_list[i]);
        }
      }
      this.discount_list = NotExpired;
    } else {
      this.getDiscounts();
    }
    // if (!expirationDate && this.quantityAvailable) {
    //     const NotExpired: any = [];
    //     for (let i = 0; i < this.discount_list.length; i++) {
    //     if (this.discount_list[i].expiration_date >= this.TodayDate && this.discount_list[i].quantity > 0) {
    //       NotExpired.push(this.discount_list[i]);
    //     }
    //   }
    //   this.discount_list = NotExpired;
    // }
    //
    // if (!expirationDate && !this.quantityAvailable) {
    //     const NotExpired: any = [];
    //     for (let i = 0; i < this.discount_list.length; i++) {
    //     if (this.discount_list[i].quantity > 0) {
    //       NotExpired.push(this.discount_list[i]);
    //     }
    //   }
    //   console.log("NotExpired>>>>>>>>>>>>>>>>>>>>",NotExpired)
    //   this.discount_list = NotExpired;
    // }

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
        this.isSuccess = true;
        this.router.navigate(['/discount', this.brand]);
      }
    },
    (err) => {
      console.log('error>>>>>>>>>>>>', err);
    }
  );
  discount_code.value = '';
  amount.value = '';
  quantity.value = '';
  discount_type.value = '';
  discount_reason.value = '';
  date.value = '';
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
      // this.router.navigate(['/discount', this.brand]);
    }
  }, (err) => {
    console.log('error>>>>>>>>>>>>', err);
  }
);
location.reload();
}
}
