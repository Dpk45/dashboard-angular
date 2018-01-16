import { Component, OnInit, Input } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import { Location } from '@angular/common';
import {StoreLocationService} from "../../services/store-location.service"
import {StoreLocationComponent} from '../store-locations-component/store-locations-component.component'

@Component({
  selector: 'store-location-detail',
  templateUrl: './store-location-detail-component.component.html',
  styleUrls: ['./store-location-detail-component.component.css']
})
export class StoreLocationDetailComponent implements OnInit {

  // @Input() kioskId: any;
  brand: any;
  kioskId: any;
  store: any;
  newStore: any
  isNewStore: boolean;
  is_cc_authorized: boolean=false;
  state_list = [
    {"key": "AL", "value": "Alabama"},
    {"key": "AK", "value": "Alaska"},
    {"key": "AS", "value": "American Samoa"},
    {"key": "AZ", "value": "Arizona"},
    {"key": "AR", "value": "Arkansas"},
    {"key": "CA", "value": "California"},
    {"key": "CO", "value": "Colorado"},
    {"key": "CT", "value": "Connecticut"},
    {"key": "DE", "value": "Delaware"},
    {"key": "DC", "value": "District Of Columbia"},
    {"key": "FM", "value": "Federated States Of Micronesia"},
    {"key": "FL", "value": "Florida"},
    {"key": "GA", "value": "Georgia"},
    {"key": "GU", "value": "Guam"},
    {"key": "HI", "value": "Hawaii"},
    {"key": "ID", "value": "Idaho"},
    {"key": "IL", "value": "Illinois"},
    {"key": "IN", "value": "Indiana"},
    {"key": "IA", "value": "Iowa"},
    {"key": "KS", "value": "Kansas"},
    {"key": "KY", "value": "Kentucky"},
    {"key": "LA", "value": "Louisiana"},
    {"key": "ME", "value": "Maine"},
    {"key": "MH", "value": "Marshall Islands"},
    {"key": "MD", "value": "Maryland"},
    {"key": "MA", "value": "Massachusetts"},
    {"key": "MI", "value": "Michigan"},
    {"key": "MN", "value": "Minnesota"},
    {"key": "MS", "value": "Mississippi"},
    {"key": "MO", "value": "Missouri"},
    {"key": "MT", "value": "Montana"},
    {"key": "NE", "value": "Nebraska"},
    {"key": "NV", "value": "Nevada"},
    {"key": "NH", "value": "New Hampshire"},
    {"key": "NJ", "value": "New Jersey"},
    {"key": "NM", "value": "New Mexico"},
    {"key": "NY", "value": "New York"},
    {"key": "NC", "value": "North Carolina"},
    {"key": "ND", "value": "North Dakota"},
    {"key": "MP", "value": "Northern Mariana Islands"},
    {"key": "OH", "value": "Ohio"},
    {"key": "OK", "value": "Oklahoma"},
    {"key": "OR", "value": "Oregon"},
    {"key": "PW", "value": "Palau"},
    {"key": "PA", "value": "Pennsylvania"},
    {"key": "PR", "value": "Puerto Rico"},
    {"key": "RI", "value": "Rhode Island"},
    {"key": "SC", "value": "South Carolina"},
    {"key": "SD", "value": "South Dakota"},
    {"key": "TN", "value": "Tennessee"},
    {"key": "TX", "value": "Texas"},
    {"key": "UT", "value": "Utah"},
    {"key": "VT", "value": "Vermont"},
    {"key": "VI", "value": "Virgin Islands"},
    {"key": "VA", "value": "Virginia"},
    {"key": "WA", "value": "Washington"},
    {"key": "WV", "value": "West Virginia"},
    {"key": "WI", "value": "Wisconsin"},
    {"key": "WY", "value": "Wyoming"}
]


  constructor(private route: ActivatedRoute, private router: Router, private _storeLocationService: StoreLocationService, private location: Location) { 

  }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.brand = params.brand
     
      if(params.kioskId){
          this.kioskId = params.kioskId
          this.isNewStore=false;
          this.getStoreLocation();
      }else{
        this.createNewStore();
      }

      this.newStore = {
        "name": "",
        "kiosk_id": "",
        "address": {
          "name": "",
          "phone": "",
          "address1": "",
          "address2": "",
          "city": "",
          "state": "",
          "zip": "",
          "country": "",
        },
        "pin_codes": [],
        "is_cc_authorized": false
      }
    })
  }

  getStoreLocation(){
    this._storeLocationService.getStoreLocation(this.kioskId, this.brand).subscribe(res=>{
      console.log("res  getStoreLocation >>>>>>", res)
      this.store = res;
    })
  }

  createNewStore(){
   this.isNewStore = true;
  }

  createStore(form){
    console.log("form value in create sotre >>>>>>>", form.value)
    this.newStore.name = form.value.name;
    this.newStore.kiosk_id = form.value.kiosk_id;
    this.newStore.address.name = form.value.address_name;
    this.newStore.address.phone = form.value.phone;
    this.newStore.address.address1 = form.value.address1;
    this.newStore.address.city = form.value.city;
    this.newStore.address.zip = form.value.zip;
    this.newStore.address.country = form.value.country
    this.newStore.is_cc_authorized = form.value.is_cc_authorized
    console.log(" this.newStore >>>>..",  this.newStore)

    this._storeLocationService.createStoreLocation( this.newStore, this.brand).subscribe(res=>{
      console.log("created store location successfully.............")
      form.reset()
    })
  }

  updateStore(formData){
    this.store.name = formData.name;
    this.store.kiosk_id = formData.kiosk_id;
    this.store.address.name = formData.address_name;
    this.store.address.phone = formData.phone;
    this.store.address.address1 = formData.address1;
    this.store.address.city = formData.city;
    this.store.address.state = formData.state;
    this.store.address.zip = formData.zip;
    this.store.address.country = formData.country
    this.store.is_cc_authorized = formData.is_cc_authorized
    console.log(" this.store >>>>..",  this.store)
    this._storeLocationService.updateStoreLocation( this.store, this.kioskId, this.brand).subscribe(res=>{
      console.log("updated store location successfully.............")
      location.reload()
    })
  }

  addNewPin(formData){
    console.log("formData >>>> in addNewPin pin", formData.new_pin)
    if(this.store.pin_codes[0] == ''){
      console.log("this.store.pin_codes.length == 0", this.store)
      this.store.pin_codes[0] = this.store.pin_codes[0].concat(formData.new_pin)
    }else{
      this.store.pin_codes[0] = this.store.pin_codes[0].concat("," + formData.new_pin) // need to check it once not the correc t way of pin handling in db
    }

    
       
     console.log(" this.store addNewPin >>>>..",  this.store)
    this._storeLocationService.updateStoreLocation( this.store, this.kioskId, this.brand).subscribe(res=>{
      console.log("updated pin of store location successfully.............")
      location.reload()
    })
  }

}
