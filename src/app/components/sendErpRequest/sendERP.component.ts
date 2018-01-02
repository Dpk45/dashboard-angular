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
  constructor(private route: ActivatedRoute, private _erpService: ErpService, private router: Router) {

}

ngOnInit(){
  this.route.params.subscribe((params:any) => {
    this.brand = params.brand;
  //  this.getDiscounts();
  });
}

}
