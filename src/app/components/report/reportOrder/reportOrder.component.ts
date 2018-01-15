import {Component, OnInit} from '@angular/core';
import { ReportService } from '../../../services/reports.service';
//import { DashAuthService } from '../../services/dashAuth.service';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  moduleId: module.id,
  selector : 'app-report-order',
  templateUrl: 'reportOrder.component.html'
})

export class ReportOrderComponent {
  brand: any;
  order_list: any;
  CurrentPageValue: number = 1;
  selectedValue = 10;

constructor(private route: ActivatedRoute, private _reportService: ReportService, private router: Router) {

}
ngOnInit() {
  this.route.params.subscribe((params:any) => {
    this.brand = params.brand;
    this.getOrderList();
  });
}

getOrderList() {
  this._reportService.getOrderListService(this.brand).subscribe(res => {
  this.order_list = res.data;
  },
  (err) => {
    console.log('error>>>>>>>>>>>>**********888', err);
  })

}
}
