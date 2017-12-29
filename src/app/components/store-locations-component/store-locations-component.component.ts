import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { StoreLocationService } from "../../services/store-location.service"

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

  constructor(private route: ActivatedRoute, private router: Router, private _storeLocationService: StoreLocationService) { }

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
      }
      
    })
  }


}
