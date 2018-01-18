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
      console.log("resposne >>>>>>>>>>>>>>",res)
      if(res.code == 200) {
      this.lensData = res.data;
    //  console.log("frameData>>>>>>>..........",this.frameData)
      }
    },
    (err) => {
      console.log('error>>>>>>>>>>>>', err);
    })
}

// create lens_colors
createLensColor(form) {
this.lensDataValues = {
'name': form.lens_name,
'active_flag': form.lens_active,
}
this._lookupService.createLensColor(this.brand, this.lensDataValues).subscribe((res: any) => {
  console.log("resposne >>>>>>>>>>>>>>",res)
  if(res.code == 200) {
   location.reload();
  }
},
(err) => {
  console.log('error>>>>>>>>>>>>', err);
})
}

// update frame_color
updateLensColor(form) {
  //console.log("data>>>>form>>>>>>>>>..",form)
  this.editLensData = {
    'name': form.update_lens_name,
    'active_flag': form.update_lens_active
  }
//  console.log("  this.editFrameData>>>>>>>>>>>>>>>>", form.update_frame_id)
  this._lookupService.updateLensColor(this.brand, this.editLensData, form.update_lens_id).subscribe((res: any) => {
    console.log("resposne >>>>>>>>>>>>>>",res)
    if(res.code == 200) {
      //this.router.navigate(['/lookup', 'frame_colors', this.brand]);
  //    location.reload();
    }
  },
  (err) => {
    console.log('error>>>>>>>>>>>>', err);
  })
}
}
