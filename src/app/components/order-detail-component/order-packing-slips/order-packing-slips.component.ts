import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { OrdersService } from '../../../services/orders-service.service';

@Component({
  moduleId: module.id,
  selector: 'app-packingslip',
  templateUrl: 'order-packing-slips.component.html'
})

export class OrderPackingSlipComponent {
  brand: any;
  order_id: any;
  order: any;
  brand_abbv: any;
  constructor(private route: ActivatedRoute, private _orderService: OrdersService, private router: Router) {

  }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.brand = params.brand;
      if (params.order_id) {
        this.order_id = params.order_id;
        this.getOrderByOrderId();
      }
    });
    this.getBrandAbbvList();
  }

  // order by order_id
  getOrderByOrderId() {
    this._orderService.getOrderByOrderId(this.brand, this.order_id).subscribe((res: any) => {
      this.order = res.data;
    })
  }

  // get brand_abbv
  getBrandAbbvList() {
    if (this.brand == 'classicspecs') {
      this.brand_abbv = 'CS';
    } else if (this.brand == 'stevenalanoptical') {
      this.brand_abbv = 'SAO';
    } else if (this.brand == 'ottavo') {
      this.brand_abbv = 'OTT';
    } else if (this.brand == 'ano') {
      this.brand_abbv = 'AO';
    } else if (this.brand == 'jasonwu') {
      this.brand_abbv = 'JW';
    } else if (this.brand == 'billyreid') {
      this.brand_abbv = 'BR';
    } else {
      this.brand_abbv = 'JWAS';
    }
  }
}
