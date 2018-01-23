import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { OrdersService } from "../../../services/orders-service.service"
import { UserService } from "../../../services/user.service"
import { API_KEYS } from '../../../config/local';
import * as moment from 'moment';

@Component({
    selector: 'app-order-update-component',
    templateUrl: './update-order.component.html',
    styleUrls: ['./update-order.component.css']
})

export class UpdateOrderComponent implements OnInit {

    brand: any;
    order_id;
    order: any;
    shippingAddress: any = {}

    constructor(private route: ActivatedRoute, private router: Router, private _orderService: OrdersService, private _userService: UserService) {

    }
    ngOnInit() {
        this.route.params.subscribe((params: any) => {
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
        })
    }

    updateOrder(form) {
        let n;
        if(form.value.name != null ){
             n = form.value.name.split(" ")
        }else{
            n=""
        }

        this.shippingAddress =
            {
                "first_name": n[0],
                "last_name": n[1],
                "phone": form.value.phone,
                "address1": form.value.address1,
                "address2": form.value.address2,
                "country": form.value.country,
                "city": form.value.city,
                "state": form.value.state,
                "zip": form.value.zip
            }
        this._orderService.updateOrder(this.brand, this.order_id, this.shippingAddress).subscribe((res: any) => {
            this.router.navigate(['/orders', this.brand, this.order_id])
        })
    }
}
