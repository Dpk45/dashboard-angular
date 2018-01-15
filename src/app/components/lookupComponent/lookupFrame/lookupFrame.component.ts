import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { LookupService } from '../../../services/lookup.service';

@Component({
  moduleId: module.id,
  selector: 'app-frame',
  templateUrl: 'lookupFrame.component.html',
})

export class FrameComponent {
  dashUserEmail: any;
  brand: any;
  frameData: any;
  frameDataValues: any;
  editFrameData: any;
  constructor(private route: ActivatedRoute, private router: Router, private _lookupService: LookupService) {
      this.dashUserEmail = JSON.parse(localStorage.getItem("current_user"));
  }

  ngOnInit(){
    this.route.params.subscribe((params: any) => {
      this.brand = params.brand;
    });
    this.getFrameColor();
  }

// get data from table frame_colors
getFrameColor() {
    this._lookupService.getFrameColor(this.brand).subscribe((res: any) => {
      console.log("resposne >>>>>>>>>>>>>>",res)
      if(res.code == 200) {
      this.frameData = res.data;
      console.log("frameData>>>>>>>..........",this.frameData)
      }
    },
    (err) => {
      console.log('error>>>>>>>>>>>>', err);
    })
}

// create frame_color
createFrameColor(form) {
this.frameDataValues = {
'name': form.frame_name,
'active_flag': form.frame_active,
}
console.log("this.frameDataValues+++++++++++++++++++",this.frameDataValues)
this._lookupService.createFrameColor(this.brand, this.frameDataValues).subscribe((res: any) => {
  console.log("resposne >>>>>>>>>>>>>>",res)
  if(res.code == 200) {
  //this.router.navigate(['/lookup', 'frame_colors', this.brand]);
    location.reload();
//  this.frameDataValues = '';
  }
},
(err) => {
  console.log('error>>>>>>>>>>>>', err);
})
}

// update frame_color
updateFrameColor(form) {
  console.log("data>>>>form>>>>>>>>>..",form)
  this.editFrameData = {
    'name': form.update_frame_name,
    'active_flag': form.update_frame_active
  }
  console.log("  this.editFrameData>>>>>>>>>>>>>>>>", form.update_frame_id)
  this._lookupService.updateFrameColor(this.brand, this.editFrameData, form.update_frame_id).subscribe((res: any) => {
    console.log("resposne >>>>>>>>>>>>>>",res)
    if(res.code == 200) {
      //this.router.navigate(['/lookup', 'frame_colors', this.brand]);
      location.reload();
    }
  },
  (err) => {
    console.log('error>>>>>>>>>>>>', err);
  })
}
}
