import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StoreLocationService } from '../../services/store-location.service'
import { Sort } from '@angular/material';

@Component({
  selector: 'store-location',
  templateUrl: './store-locations-component.component.html',
  styleUrls: ['./store-locations-component.component.css']
})
export class StoreLocationComponent implements OnInit {


  brand: any;
  store_locations: any = [];
  p: number = 1;
  selectedValue = 10;
  sortedData: any;

  isDesc: boolean = false;
  column: any;
  direction: number;

  constructor(private route: ActivatedRoute, private router: Router, private _storeLocationService: StoreLocationService) {
    // this.sortedData = this.store_locations.slice();
  }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.brand = params.brand;
      this.getStoreLocations();
    });
  }


  getStoreLocations() {
    this._storeLocationService.getStoreLocations(this.brand).subscribe(res => {
      if (Object.keys(res.data).length) {
        this.store_locations = res.data;
        this.sortedData = res.data;
      }
    });
  }

  sort(property) {

    if (property == 'address') {
      property = 'address.address1';
    }
    if (property == 'phone') {
      property = 'address.phone';
    }
    this.isDesc = !this.isDesc;   // change the direction
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  }

}
