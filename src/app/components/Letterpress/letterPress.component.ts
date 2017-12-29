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
  constructor(private route: ActivatedRoute, private _letterService: LetterPressService, private router: Router) {
  }

  ngOnInit(){
    this.route.params.subscribe((params: any) => {
      this.brand = params.brand;
      this.getEmailTemplates();
      this.getCommonEmailTemplates();
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
    //  console.log("  this.getOnetemplate >>>>>>>>>>>>>>>>>>",  this.getOnetemplate )
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
    console.log("inside of email_template>>>>>>>>>>>>>>>>>>>>>>>....")
    this._letterService.updateOneTemplate(this.subject, this.fromName, this.fromEmail, this.text, this.html, this.getOnetemplate.name, this.brand)
    .subscribe(res => {
console.log("save>>>>>>>>>>>>>>>>>>>...",res.data)
      this.save = "Saved !"

      //this.getOnetemplate = res.data;

      //console.log("  this.getOnetemplate >>>>>>>>>>>>>>>>>>",  this.getOnetemplate )
      //  this.template = true;
    })
  }

  // get common_templates
  getCommonEmailTemplates() {
    this._letterService.getCommonTemplate(this.brand).subscribe(res => {

      console.log("data>>>>>>>>>>>>>>>",res.data)
      this.commontemplate = res.data;
    });
  }

// get one common template
  foundCommonTemplate(name:any) {
    this._letterService.findOneCommonTemplate(name, this.brand)
    .subscribe(res => {
      console.log("foundone >>>>>>>>>>>>>",res.data)
      this.getCommontemplate = res.data;
      this.commontemplateVariable = true;
    })
  }

  // update common template
  updateCommonTemplate(content: any) {
    this.content = content.value;
    console.log("inside of email_template>>>>>>>>>>>>>>>>>>>>>>>....")
    this._letterService.updateCommonTemplate(this.content, this.getCommontemplate.name, this.brand)
    .subscribe(res => {
      console.log("response >>>>>>>>>>>>>>>>>>",res.data)
      this.save = "Saved !";
    })
  }
}
