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

// // create frame_color
// createFrameColor(form) {
// this.frameDataValues = {
// 'name': form.frame_name,
// 'active_flag': form.frame_active,
// }
// console.log("this.frameDataValues+++++++++++++++++++",this.frameDataValues)
// this._lookupService.createFrameColor(this.brand, this.frameDataValues).subscribe((res: any) => {
//   console.log("resposne >>>>>>>>>>>>>>",res)
//   if(res.code == 200) {
//   //this.router.navigate(['/lookup', 'frame_colors', this.brand]);
//     location.reload();
// //  this.frameDataValues = '';
//   }
// },
// (err) => {
//   console.log('error>>>>>>>>>>>>', err);
// })
// }
//
// // update frame_color
// updateFrameColor(form) {
//   console.log("data>>>>form>>>>>>>>>..",form)
//   this.editFrameData = {
//     'name': form.update_frame_name,
//     'active_flag': form.update_frame_active
//   }
//   console.log("  this.editFrameData>>>>>>>>>>>>>>>>", form.update_frame_id)
//   this._lookupService.updateFrameColor(this.brand, this.editFrameData, form.update_frame_id).subscribe((res: any) => {
//     console.log("resposne >>>>>>>>>>>>>>",res)
//     if(res.code == 200) {
//       //this.router.navigate(['/lookup', 'frame_colors', this.brand]);
//       location.reload();
//     }
//   },
//   (err) => {
//     console.log('error>>>>>>>>>>>>', err);
//   })
// }
}
