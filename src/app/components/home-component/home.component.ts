import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashUserService } from '../../services/dashUser.service'
import { HomeService } from '../../services/home.service'

@Component({
  moduleId:module.id,
  selector: 'home',
  templateUrl: "home.component.html",
})
export class HomeComponent  {
  upcObject: any
  current_user: any;
  dashUser: any;
  batchname: any;
  formdata: any;
  file: any;
  reportbatchname: any = 'Batch 2';
  isSuccess: boolean;
  SuccessfullyCreatedUpc: boolean;
  batchName: any;
  constructor(private router: Router, private _dashUserService: DashUserService, private _homeService: HomeService) {
  this.current_user = JSON.parse(localStorage.getItem("current_user"));
  }
  ngOnInit() {
    this._dashUserService.getDashUserByEmail(this.current_user.email).subscribe((res) => {
        this.dashUser = res;
      })
      this.getBatchName();
  }

// create upc_code
  createUpcCode(form) {
    console.log(">>>>>>>>. form  >>>>>>>>", form)
    this.batchname = form.batchname;
    this._homeService.createUpcCode(this.batchname, this.upcObject).subscribe((res:any) => {
      console.log("res>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", res)
      if(res.code == 200) {
        this.SuccessfullyCreatedUpc = true;
        }
      }, (err) => {
      console.log('error>>>>>>>>>>>>', err);
    })
  }

// send upc_code report
  upcCodeReport(form) {
    this.reportbatchname = form.reportbatchname;
    this._homeService.upcCodeReport(this.reportbatchname).subscribe((res: any) => {
      console.log("res>>>>>>>>>>>>>>>>>>>>>>>>.  upc code report>...............", res)
      if(res.code == 200) {
        this.isSuccess = true;
        }
      }, (err) => {
      console.log('error>>>>>>>>>>>>', err);
    })
  }


 /**
   * fileUpload Event
   * @param event
   */
  fileUpload(event) {
    // this.isLoading = true;
    let reader = new FileReader();
    reader.onload = () => {
      this.upcObject = {
        data: btoa(reader.result),
      };
    };
    reader.readAsBinaryString(event.target.files[0]);
  }

  // get list of batchname
  getBatchName() {
    this._homeService.getBatchName().subscribe((res: any) => {
      console.log("res>>>>>>>>>>>>>>>>>>>>>>>>.  upc code report>...............", res)
      if(res.code == 200) {
        this.batchName = res.data;
        }
      }, (err) => {
      console.log('error>>>>>>>>>>>>', err);
    })
  }
}
