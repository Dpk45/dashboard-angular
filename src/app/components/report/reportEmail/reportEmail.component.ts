import {Component, OnInit} from '@angular/core';
//import { DashUserService } from '../../services/dashUser.service';
//import { DashAuthService } from '../../services/dashAuth.service';
import { ReportService } from '../../../services/reports.service';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  moduleId: module.id,
  selector : 'app-report-email',
  templateUrl: 'reportEmail.component.html'
})

export class ReportEmailComponent {
  brand: any;
  startDate: any;
  endDate: any;
  eyewearStartDate: any;
  eyewearEndDate: any;
  eyewearFinanaceStartDate: any;
  eyewearFinanaceEndDate: any;
  HtkStartDate: any;
  HtkEndDate: any;
  HtkpastdueStartDate: any;
  HtkpastdueEndDate: any;
  isSuccess: boolean;

constructor(private route: ActivatedRoute, private _reportService: ReportService, private router: Router) {

}
ngOnInit() {
  this.route.params.subscribe((params:any) => {
    this.brand = params.brand;
  });
}

// get eyewearSales Report
eyewearSalesReport(form) {
	this.startDate = form.value.startDate;
	this.endDate = form.value.endDate;
    console.log("get eyewaer sales>>>>>>>>>>>>>>>++++++++++++++++++++++",this.startDate,"\n\n",this.endDate)
    this._reportService.getEyewearSalesReport(this.startDate, this.endDate, this.brand).subscribe(res => {
    if(res.code == 200){
      this.isSuccess = true;
      form.reset();
    }

    },
    (err) => {
      console.log('error>>>>>>>>>>>>', err);
    })
}

// get eyewearSales Report
eyewearSalesFinanaceReport(formSales) {
   this.startDate = formSales.value.startDate;
   this.endDate = formSales.value.endDate;
    this._reportService.getEyewearSalesFinanaceReport(this.startDate, this.endDate, this.brand).subscribe(res => {
      if(res.code == 200) {
        this.isSuccess = true;
        formSales.reset();
      }
    },
    (err) => {
      console.log('error>>>>>>>>>>>>', err);
    })
}

// get eyewearSales Report
htkSalesReport(formHtk) {
  this.startDate = formHtk.value.startDate;
  this.endDate = formHtk.value.endDate;
    console.log("get eyewaer sales>>>>>>>>>>>>>>>++++++++++++++++++++++")
    this._reportService.getHtkSalesReport(this.startDate, this.endDate, this.brand).subscribe(res => {
      if(res.code == 200){
        this.isSuccess = true;
          formHtk.reset();
      }
    },
    (err) => {
      console.log('error>>>>>>>>>>>>', err);
    })
}

// send inventory report
inventoryReport() {
  this._reportService.getinventoryReport(this.brand).subscribe(res => {
    if(res.code == 200){
      this.isSuccess = true
    }
  },
  (err) => {
    console.log('error>>>>>>>>>>>>', err);
  })
}

// send htk past due report
htkPastDueReport(formHtkPast) {
  this.startDate = formHtkPast.value.startDate;
  this.endDate = formHtkPast.value.endDate;
    this._reportService.gethtkPastDueReport(this.startDate, this.endDate, this.brand).subscribe(res => {
      if(res.code == 200){
        this.isSuccess = true
        formHtkPast.reset();
      }
    },
    (err) => {
      console.log('error>>>>>>>>>>>>', err);
    })
  }

}
