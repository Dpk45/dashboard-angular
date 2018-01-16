import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { LookupService } from '../../../services/lookup.service';

@Component({
  moduleId: module.id,
  selector: 'app-style',
  templateUrl: 'lookupStyle.component.html',
})

export class StyleComponent {
  dashUserEmail: any;
  brand: any;
  styleData: any;
  styleDataValues: any;
  editStyleData: any;
  //styleDataValues: any;
  constructor(private route: ActivatedRoute, private router: Router, private _lookupService: LookupService) {
      this.dashUserEmail = JSON.parse(localStorage.getItem("current_user"));
  }

  ngOnInit(){
    this.route.params.subscribe((params: any) => {
      this.brand = params.brand;
    });
    this.getStyle();
  }

// get data from table styles
getStyle() {
    this._lookupService.getStyle(this.brand).subscribe((res: any) => {
      console.log("resposne >>>>>>>>>>>>>>",res)
      if(res.code == 200) {
      this.styleData = res.data;
    //  console.log("frameData>>>>>>>..........",this.styleData)
      }
    },
    (err) => {
      console.log('error>>>>>>>>>>>>', err);
    })
}

// create style
createStyle(form) {
this.styleDataValues = {
'name': form.style_name,
'active_flag': form.style_active,
}
//console.log("this.frameDataValues+++++++++++++++++++",this.frameDataValues)
this._lookupService.createStyle(this.brand, this.styleDataValues).subscribe((res: any) => {
  //console.log("resposne >>>>>>>>>>>>>>",res)
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

// update style
updatStyle(form) {
  console.log("data>>>>form>>>>>>>>>..",form)
  this.editStyleData = {
    'name': form.update_style_name,
    'active_flag': form.update_style_active
  }
//  console.log("  this.editFrameData>>>>>>>>>>>>>>>>", form.update_frame_id)
  this._lookupService.updateStyle(this.brand, this.editStyleData, form.update_style_id).subscribe((res: any) => {
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
