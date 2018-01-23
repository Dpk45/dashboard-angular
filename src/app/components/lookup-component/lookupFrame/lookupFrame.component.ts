import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { LookupService } from '../../../services/lookup.service';

@Component({
  moduleId: module.id,
  selector: 'app-frame',
  templateUrl: 'lookupFrame.component.html',
})

export class FrameComponent {
  brand: any;
  frameData: any;
  frameDataValues: any;
  editFrameData: any;
  isDesc: boolean = false;
  column: string;
  direction: number;
  constructor(private route: ActivatedRoute, private router: Router, private _lookupService: LookupService) {
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
      if(res.code == 200) {
      this.frameData = res.data;
      }
    },
    (err) => {
      console.log('error>>>>>>>>>>>>', err);
    })
}

// create frame_color
createFrameColor(frame_name, frame_active) {
this.frameDataValues = {
'name': frame_name,
'active_flag': frame_active,
}
this._lookupService.createFrameColor(this.brand, this.frameDataValues).subscribe((res: any) => {
  if(res.code == 200) {
  //this.router.navigate(['/lookup', 'frame_colors', this.brand]);
   location.reload();
  }
},
(err) => {
  console.log('error>>>>>>>>>>>>', err);
})
}

// update frame_color
updateFrameColor(update_frame_id, update_frame_name, update_frame_active) {
  this.editFrameData = {
    'name': update_frame_name,
    'active_flag': update_frame_active
  }
  this._lookupService.updateFrameColor(this.brand, this.editFrameData, update_frame_id).subscribe((res: any) => {
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
