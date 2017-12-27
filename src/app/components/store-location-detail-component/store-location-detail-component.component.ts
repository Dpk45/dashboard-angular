import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {StoreLocationService} from "../../services/store-location.service"

@Component({
  selector: 'store-location-detail',
  templateUrl: './store-location-detail-component.component.html',
  styleUrls: ['./store-location-detail-component.component.css']
})
export class StoreLocationDetailComponent implements OnInit {

  brand: any;

  constructor(private route: ActivatedRoute, private router: Router, private _storeLocationService: StoreLocationService) { }

  ngOnInit() {
    
  }

}
