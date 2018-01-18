import {Component} from '@angular/core';
import {LetterPressService} from '../../services/letterPress.service';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  moduleId: module.id,
  selector : 'app-letter',
  templateUrl: 'letterPress.component.html'
})

export class LetterPressComponent {
  brand: any;
  dataValue: any;
  token: any;
  templateList: any;
  commontemplate: any;
  getOnetemplate: any;
  templateName: any;
  getCommontemplate: any;
  template: boolean;
  commontemplateVariable: boolean;
  subject: any;
  content: any;
  fromName: any;
  fromEmail: any;
  text: any;
  html:any;
  save: any;
  name: any;
  isPreview: boolean;
  isTemplateAvailable: boolean;
  constructor(private route: ActivatedRoute, private _letterService: LetterPressService, private router: Router) {
  }

  ngOnInit(){
    this.route.params.subscribe((params: any) => {
      this.brand = params.brand;
      this.getEmailTemplates();
      this.getCommonEmailTemplates();
      if(params.name) {
        this.name = params.name;
        this.foundtemplateName(this.name);
        this.foundCommonTemplate(this.name);
      }
    });
  }

  // get email_templates
  getEmailTemplates() {
    this._letterService.getTemplate(this.brand).subscribe(res => {
      this.templateList = res.data;
    });
  }

// get one template
  foundtemplateName(name: any) {
    this._letterService.findOneTemplate(name, this.brand)
    .subscribe(res => {
      this.getOnetemplate = res.data;
      this.template = true;
    })
  }

// update one template
  updateTemplate(subject: any, from_name: any, from_email: any, text: any, html: any) {
    this.subject = subject.value;
    this.fromName = from_name.value;
    this.fromEmail = from_email.value;
    this.text = text.value;
    this.html = html.value;
    this._letterService.updateOneTemplate(this.subject, this.fromName, this.fromEmail, this.text, this.html, this.getOnetemplate.name, this.brand)
    .subscribe(res => {
      this.save = "Saved !"
      // this.router.navigate(['/letterpress', this.brand]);
    })
  }

  // get common_templates
  getCommonEmailTemplates() {
    this._letterService.getCommonTemplate(this.brand).subscribe(res => {
      this.commontemplate = res.data;
    });
  }

// get one common template
  foundCommonTemplate(name: any) {
    this._letterService.findOneCommonTemplate(name, this.brand)
    .subscribe(res => {
      this.getCommontemplate = res.data;
      this.commontemplateVariable = true;
    })
  }

  // update common template
  updateCommonTemplate(content: any) {
    this.content = content.value;
    this._letterService.updateCommonTemplate(this.content, this.getCommontemplate.name, this.brand)
    .subscribe(res => {
      this.save = 'Saved !';
      // this.router.navigate(['/letterpress', this.brand]);
    })
  }
}
