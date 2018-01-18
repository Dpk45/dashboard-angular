import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
//import { ProductService } from '../../../services/product.service'

@Component({
  moduleId: module.id,
  selector: 'product-nav',
  templateUrl: 'productNavbar.component.html',
})

export class ProductNavBar {
  brand: any;
  dashUserEmail: any;
  constructor(private route: ActivatedRoute, private router: Router) {
    this.dashUserEmail = JSON.parse(localStorage.getItem("current_user"));
  }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.brand = params.brand;
    });
  }
}
