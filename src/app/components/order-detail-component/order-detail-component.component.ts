import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { OrdersService } from "../../services/orders-service.service"
import { UserService } from "../../services/user.service"
import { API_KEYS } from '../../config/local';
import * as moment from 'moment';

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
  selectedReasonCode: any
  selectedLab: any = null
  labs: any

  BASE_REASONS: any[] = [
    "Lab - Incorrect Prescription (one eye)",
    "Lab - Incorrect Prescription (both eyes)",
    "Lab - Lens Edged in Incorrectly",
    "Lab - Frame not bench aligned",
    "Lab - Wrong frame sent",
    "Lab - Wrong frame color sent",
    "Lab - Other Lab Issue",
    "USPS - Package took too long to receive",
    "USPS - Other USPS Issue",
    "Eponym Office - Wrong rx entered",
    "Eponym Office - Wrong frame entered",
    "Eponym Office - Wrong customer information entered by eponym",
    "Eponym Office - Wrong type of lens entered",
    "Eponym Office - Other customer service issued",
    "Eponym Office - Processing time too long",
    "Eponym Retail - Wrong rx entered",
    "Eponym Retail - Wrong frame entered",
    "Eponym Retail - Wrong customer information entered by eponym",
    "Eponym Retail - Wrong type of lens entered",
    "Eponym Retail - Other retail issue",
    "Warranty - Frame Damaged",
    "Warranty - Lens Damaged (AR)",
    "Warranty - Lens Damaged (scratch)",
    "Warranty - Lens Damaged (other)",
    "Reprocessed",
    "Rx Doctor - Incorrect Rx (Right eye)",
    "Rx Doctor - Incorrect Rx (left eye)",
    "Rx Doctor - Incorrect Rx (both eyes)",
    "Rx Doctor - Revised Prescription",
    "Rx Doctor - Cancellation related to non-release of rx",
    "Rx Doctor - Wrong rx submitted",
    "Rx Doctor - Rx out of range",
    "Customer - Didn't like style",
    "Customer - Didn't like color",
    "Customer - Didn't like style/color",
    "Customer - Wrong Rx entered (right eye)",
    "Customer - Wrong Rx entered (left eye)",
    "Customer - Wrong rx entered (both eyes)",
    "Customer - Unable to obtain PD",
    "Customer - General dissatisfaction",
    "Customer - Wrong shipping address entered/misdelivery",
    "Customer - Lens aesthetics",
    "Customer - Cancellation related to invalid prescription-PROGRESSIVES",
    "Customer - Cancellation related to invalid prescription (expired)",
    "Customer - Rx adaptation issue",
    "Customer - Changed mind about order",
    "Customer - Fraud",
    "Customer - Meant to order HTK",
    "Customer - Did not fit",
    "Other - Progressives - Lens Type Non Adapt",
    "EXCHANGE",
    "Eponym Office - Replacement",
    "Other - Other"
  ]
  RETURN_REASON_CODES: any[];
  CANCELLATION_REASON_CODES: any[]

  REFUND_REASON_CODES: any;
  SC_REASON_CODES: any;
  // rx_sent_to_lab: any = [];
  constructor(private route: ActivatedRoute, private router: Router, private _orderService: OrdersService, private _userService: UserService) {
    this.RETURN_REASON_CODES = this.BASE_REASONS
    this.CANCELLATION_REASON_CODES = this.BASE_REASONS
    this.CANCELLATION_REASON_CODES.concat('USPS - Lost package')
    this.CANCELLATION_REASON_CODES.concat('USPS - Misdelivered package')
    this.CANCELLATION_REASON_CODES.concat('USPS - Address verification issue')
    this.REFUND_REASON_CODES = this.CANCELLATION_REASON_CODES
    this.SC_REASON_CODES = this.CANCELLATION_REASON_CODES;
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
      this.labs = API_KEYS[this.brand].labs
      console.log("this.labs  >>>>", this.labs)
      console.log(this.order)
    })
  }


  saveRx(email, item_id, brand, rx_id, rx) {
    if (rx.valid_rx == null) {
      rx.valid_rx = "VALID"
    }
    if (rx.entered_at == null) {
      rx.entered_at = rx.created_at
    }
    this._userService.updateRx(email, brand, rx_id, rx).subscribe((res: any) => {
      if (res.code == 200) {
        location.reload();
      }
    })
  }

  sendToLab(order_id, item_id, brand, lab) {
    console.log("order_id, item_id, brand", order_id, item_id, brand, lab)
    let data = {}
    this._orderService.sendToLab(this.brand, this.order_id, lab, item_id, data).subscribe((res: any) => {
      console.log("res >>>", res)
      if (res.code == 200) {
        location.reload();
      }
    })
  }

  receivedByLab(order_id, item_id, brand) {
    console.log("order_id, item_id", order_id, item_id, brand)
    let data = {}
    this._orderService.receivedByLab(this.brand, this.order_id, item_id, data).subscribe((res: any) => {
      console.log("res >>>", res)
      if (res.code == 200) {
        location.reload();
      }
    })
  }

  labFinishedProcessing(order_id, item_id, brand) {
    console.log("order_id, item_id", order_id, item_id, brand)
    let data = {}
    this._orderService.labFinishedProcessing(this.brand, this.order_id, item_id, data).subscribe((res: any) => {
      console.log("res >>>", res)
      if (res.code == 200) {
        location.reload();
      }
    })
  }

  receiveFromLab(order_id, item_id, brand) {
    console.log("order_id, item_id", order_id, item_id, brand)
    let data = {}
    this._orderService.receiveFromLab(this.brand, this.order_id, item_id, data).subscribe((res: any) => {
      console.log("res >>>", res)
      if (res.code == 200) {
        location.reload();
      }
    })
  }

  returnItem(order_id, item_id, brand, reason, description){
    console.log("reason", reason)
    console.log("description", description)
    let data = {}
    this._orderService.returnItem(this.brand, this.order_id, item_id, reason, description, data).subscribe((res: any) => {
      console.log("res >>>", res)
      if (res.code == 200) {
        location.reload();
      }
    })
  }

  cancelItem(order_id, item_id, brand, reason, description){
    console.log("reason", reason)
    console.log("description", description)
    let data = {}
    this._orderService.cancelItem(this.brand, this.order_id, item_id, reason, description, data).subscribe((res: any) => {
      console.log("res >>>", res)
      if (res.code == 200) {
        location.reload();
      }
    })
  }

  refund(order_id, item_id, brand, reason, description, amount){
    console.log("reason", reason)
    console.log("description", description)
    let data = {}
    this._orderService.refund(this.brand, this.order_id, item_id, reason, description, amount, data).subscribe((res: any) => {
      console.log("res >>>", res)
      if (res.code == 200) {
        location.reload();
      }
    })
  }

  issueStoreCredit(order_id, item_id, brand, reason, description, amount){
    console.log("reason", reason)
    console.log("description", description)
    console.log("amount", amount)
    let data = {}
    this._orderService.issueStoreCredit(this.brand, this.order_id, item_id, reason, description, amount, data).subscribe((res: any) => {
      console.log("res >>>", res)
      if (res.code == 200) {
        location.reload();
      }
    })
  }

  addNote(form){
    console.log("form >>>>>>>", form);
    let data = form
    this._orderService.addInternalNote(this.brand, this.order_id, data).subscribe((res: any) => {
      console.log("res >>>", res)
      if (res.code == 200) {
        location.reload();
      }
    })
  }

}
