import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { OrdersService } from "../../services/orders-service.service"

@Component({
  selector: 'app-order-detail-component',
  templateUrl: './order-detail-component.component.html',
  styleUrls: ['./order-detail-component.component.css']
})
export class OrderDetailComponent implements OnInit {

  brand: any
  order_id: any
  order: any
  objectKeys = Object.keys;
  // rx_sent_to_lab: any = [];
  constructor(private route: ActivatedRoute, private router: Router, private _orderService: OrdersService) { }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      console.log("params >>>", params)
      if (params.brand) {
        this.brand = params.brand
      }
      if (params.order_id) {
        this.order_id = params.order_id;
      }
      this.getOrderByOrderId();
    })
  }

  getOrderByOrderId() {
    this._orderService.getOrderByOrderId(this.brand, this.order_id).subscribe((res: any) => {
      this.order = res.data;
      console.log("order >>>>>>>>>", this.order);
      // for (let item of this.order['items']['eyewear']['items']) {
      //   if (item['rx']) {
      //       if (item.status.sent_to_lab_at != null) {
      //         this.rx_sent_to_lab.push(item['rx']['id'])
      //       }
      //   }
      // }
    })
  }
}
