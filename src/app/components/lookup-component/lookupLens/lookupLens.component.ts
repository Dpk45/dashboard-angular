import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { LookupService } from '../../../services/lookup.service';

@Component({
  moduleId: module.id,
  selector: 'app-lens',
  templateUrl: 'lookupLens.component.html',
})

export class LensComponent {
  brand: any;
  lensData: any;
  lensDataValues: any;
  editLensData: any;

  isDesc: boolean = false;
  column: string;
  direction: number;

  constructor(private route: ActivatedRoute, private router: Router, private _lookupService: LookupService) {
  }

  ngOnInit(){
    this.route.params.subscribe((params: any) => {
      this.brand = params.brand;
    });
    this.getLensColor();
  }

// get data from table lens_colors
getLensColor() {
    this._lookupService.getLensColor(this.brand).subscribe((res: any) => {
      if(res.code == 200) {
      this.lensData = res.data;
      }
    },
    (err) => {
      console.log('error>>>>>>>>>>>>', err);
    })
}

// create lens_colors
createLensColor(lens_name, lens_active) {
this.lensDataValues = {
'name': lens_name,
'active_flag': lens_active,
}
this._lookupService.createLensColor(this.brand, this.lensDataValues).subscribe((res: any) => {
  if(res.code == 200) {
   location.reload();
  }
},
(err) => {
  console.log('error>>>>>>>>>>>>', err);
})
}

// update frame_color
updateLensColor(update_lens_id, update_lens_name, update_lens_active) {
  this.editLensData = {
    'name': update_lens_name,
    'active_flag': update_lens_active
  }
  this._lookupService.updateLensColor(this.brand, this.editLensData, update_lens_id).subscribe((res: any) => {
    if(res.code == 200) {
      //this.router.navigate(['/lookup', 'frame_colors', this.brand]);
  //    location.reload();
    }
  },
  (err) => {
    console.log('error>>>>>>>>>>>>', err);
  })
}

// apply sorting
sort(property) {
  this.isDesc = !this.isDesc;   // change the direction
  this.column = property;
  this.direction = this.isDesc ? 1 : -1;
}
}
