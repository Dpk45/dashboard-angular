import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { ErpService } from '../../services/sendErp.service';
// import { UserService } from "../../services/user.service"

@Component({
  moduleId: module.id,
  selector: 'app-erp',
  templateUrl: 'sendERP.component.html',
})

export class ErpComponent {
  brand: any;
  selectedValue: any = 'authorize_return';
  performedAt: any = '';
  payload: any = '';
  isSuccess: boolean;
  constructor(private route: ActivatedRoute, private _erpService: ErpService, private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe((params:any) => {
      this.brand = params.brand;
    });
  }

  // postErpMessage
  erpReport(form) {
    this.selectedValue = form.action;
    this.performedAt = form.performed_at;
    this.payload = JSON.parse(form.payload);
    this._erpService.sendErpRequest(this.selectedValue, this.performedAt, this.payload, this.brand).subscribe(res => {
      if(res.code == 200){
        this.isSuccess = true;
        this.performedAt = '' ;
        this.payload = '';
      }
    },
    (err) => {
      console.log('error>>>>>>>>>>>>', err);
    })
}

}
