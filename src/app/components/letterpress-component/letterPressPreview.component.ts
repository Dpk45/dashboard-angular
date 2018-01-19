import {Component} from '@angular/core';
import {LetterPressService} from '../../services/letterPress.service';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  moduleId: module.id,
  selector : 'app-letter',
  templateUrl: 'letterPressPreview.component.html'
})

export class LetterPressPreviewComponent {
templateName: any;
brand: any;
templateData: any;
isSuccess: boolean;
  constructor(private route: ActivatedRoute, private _letterService: LetterPressService, private router: Router) {
  }

  ngOnInit(){
    this.route.params.subscribe((params: any) => {
      this.brand = params.brand;
      this.templateName = params.name;
    });
  }

// get one template
  getTemplate(form) {
    this.templateName = form.templateName;
    this._letterService.findOneTemplate(this.templateName, this.brand)
    .subscribe(res => {
      if(res.code == 200) {
        this.isSuccess = true;
      this.templateData = res.data;
    }
    })
  }

}
