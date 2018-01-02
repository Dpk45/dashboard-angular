import {Component, OnInit} from '@angular/core';
//import { DashUserService } from '../../services/dashUser.service';
//import { DashAuthService } from '../../services/dashAuth.service';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  moduleId: module.id,
  selector : 'app-report-style',
  templateUrl: 'reportStyle.component.html'
})

export class ReportStyleComponent {
  current_user: any;
  dashUser: any;
constructor(private router: Router) {
  //this.current_user = JSON.parse(localStorage.getItem("current_user"));
}
ngOnInit(){
  // this._dashUserService.getDashUserByEmail(this.current_user.email).subscribe((res) => {
  //       this.dashUser = res;
  //   })
}
}
