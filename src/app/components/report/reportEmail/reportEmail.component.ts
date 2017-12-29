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
constructor(private route: ActivatedRoute, private _reportService: ReportService, private router: Router) {
  //this.current_user = JSON.parse(localStorage.getItem("current_user"));
}
ngOnInit() {
  this.route.params.subscribe((params:any) => {
    this.brand = params.brand;
  });
}
}
