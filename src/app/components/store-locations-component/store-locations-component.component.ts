import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { StoreLocationService } from "../../services/store-location.service"
import {Sort} from '@angular/material';

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
  orderBy: string = 'kiosk_id'

  constructor(private route: ActivatedRoute, private router: Router, private _storeLocationService: StoreLocationService) {
    // this.sortedData = this.store_locations.slice();
   }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.brand = params.brand
      this.getStoreLocations();
      console.log(" this.brand vvvvvvvvvv", this.brand)
    });
  }


  getStoreLocations() {
    this._storeLocationService.getStoreLocations(this.brand).subscribe(res => {
      console.log("res _storeLocationService>>>>>>>>", res)
      if(Object.keys(res.data).length){
        this.store_locations = res.data;
        this.sortedData = res.data;
      }
      
    })
  }

  sortData(sort) {
    console.log(">>>>> sort >>>>>>>", sort)
    this.orderBy = sort;
    // this.orderBy = sort.active;
    // const data = this.store_locations.slice();
    // console.log(" this.store_locations >>>>>", this.store_locations);
    // console.log(" data to sort >>>>>", data);
    // if (!sort.active || sort.direction == '') {
    //   // this.sortedData = data;
    //   console.log("this.sorted data ...", this.sortedData)
    //   return data;
    // }

    // return this.sortedData = data.sort((a, b) => {
    //   // console.log("a >>>>>>>>.", a)
    //   // console.log("b >>>>>>>>..", b)
    //   let isAsc = sort.direction == 'asc';
    //   switch (sort.active) {
    //     case 'name': return compare(a.name, b.name, isAsc);
    //     case 'address': return compare(+a.address, +b.address, isAsc);
    //     case 'kiosk_id': return compare(+a.kiosk_id, +b.kiosk_id, isAsc);
    //     case 'phone': return compare(+a.phone, +b.phone, isAsc);
    //     case 'pins': return compare(+a.pins, +b.pins, isAsc);
    //     default: return 0;
    //   }
    // });

    // function compare(a, b, isAsc) {
    //   let x = (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    //   console.log("x >>>>>>>>>>", x)
    //   return x;
    // }
  }
  
 



}
