import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { LookupService } from '../../../services/lookup.service';

@Component({
  moduleId: module.id,
  selector: 'app-style',
  templateUrl: 'lookupStyle.component.html',
})

export class StyleComponent {
  brand: any;
  styleData: any;
  styleDataValues: any;
  editStyleData: any;
  isDesc: boolean = false;
  column: string;
  direction: number;
  constructor(private route: ActivatedRoute, private router: Router, private _lookupService: LookupService) {
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
      //console.log("resposne >>>>>>>>>>>>>> styleeeeeeeeeeeeeee", res)
      if(res.code == 200) {
      this.styleData = res.data;
      }
    },
    (err) => {
      console.log('error>>>>>>>>>>>>', err);
    })
}

// create style
createStyle(style_name, style_active) {
this.styleDataValues = {
'name': style_name,
'active_flag': style_active,
}
this._lookupService.createStyle(this.brand, this.styleDataValues).subscribe((res: any) => {
  if(res.code == 200) {
  //this.router.navigate(['/lookup', 'frame_colors', this.brand]);
    location.reload();
  }
},
(err) => {
  console.log('error>>>>>>>>>>>>', err);
})
}

// update style
updatStyle(update_style_id, update_style_name, update_style_active) {
  this.editStyleData = {
    'name': update_style_name,
    'active_flag': update_style_active
  }
  this._lookupService.updateStyle(this.brand, this.editStyleData, update_style_id).subscribe((res: any) => {
    console.log("resposne >>>>>>>>>>>>>>++++++++++++++++",res)
    if(res.code == 200) {
      //this.router.navigate(['/lookup', 'frame_colors', this.brand]);
    //  location.reload();
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
