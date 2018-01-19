import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { LookupService } from '../../../services/lookup.service';

@Component({
  moduleId: module.id,
  selector: 'app-template',
  templateUrl: 'lookupTemplate.component.html',
})

export class TemplateComponent {
  brand: any;
  templateData: any;
  templateDataValues: any;
  editTemplateData: any;
  isDesc: boolean = false;
  column: string;
  direction: number;
  constructor(private route: ActivatedRoute, private router: Router, private _lookupService: LookupService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.brand = params.brand;
    });
    this.getTemplateMap();
  }

// get data from table styles
getTemplateMap() {
    this._lookupService.getTemplateMap(this.brand).subscribe((res: any) => {
      //console.log("resposne >>>>>>>>>>>>>> styleeeeeeeeeeeeeee", res)
      if(res.code == 200) {
      this.templateData = res.data;
      console.log(">>>>>>>>>>>>>>>>.................", this.templateData)
      }
    },
    (err) => {
      console.log('error>>>>>>>>>>>>', err);
    })
}

// create template Map
createTemplateMap(template_name, optical, optical_template, generate_sun, sun_template, template_active) {
this.templateDataValues = {
'name': template_name,
'generate_optical': optical,
'optical_template': optical_template,
'generate_sun': generate_sun,
'sun_template': sun_template
'active_flag': template_active
}
console.log("this.templateDataValues>>>>>>>>>>>>>>>>..",this.templateDataValues)
this._lookupService.createTemplateMap(this.brand, this.templateDataValues).subscribe((res: any) => {
  if(res.code == 200) {
    location.reload();
  }
},
(err) => {
  console.log('error>>>>>>>>>>>>', err);
})
}

// update template_map
updateTemplateMap(updated_id, updated_name, updated_optical, updated_optical_template, updated_generate_sun, updated_sun_template, updated_template_active) {
  this.editTemplateData = {
    'name': updated_name,
    'generate_optical': updated_optical,
    'optical_template': updated_optical_template,
    'generate_sun': updated_generate_sun,
    'sun_template': updated_sun_template,
    'active_flag': updated_template_active
  }
  this._lookupService.updatTemplateMap(this.brand, this.editTemplateData, updated_id).subscribe((res: any) => {
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
