import { Component } from '@angular/core';
// import {userdata} from  '../../services/userdata.service';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'app-error',
    templateUrl: 'error.component.html',
    styleUrls: ['error.component.css']

})

export class ErrorComponent {
  isNotFoundOrder: boolean;
  order_id: any;
  constructor(private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit(){
    this.route.params.subscribe((params: any) => {
      if(params.order_id) {
        this.notFoundOrder(params.order_id);
      }
    });
  }

  notFoundOrder(order_id){
    this.isNotFoundOrder = true;
    this.order_id = order_id
  }
}
