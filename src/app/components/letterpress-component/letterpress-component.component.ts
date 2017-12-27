import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { LetterpressService } from "../../services/letterpress.service"

@Component({
  selector: 'app-letterpress-component',
  templateUrl: './letterpress-component.component.html',
  styleUrls: ['./letterpress-component.component.css']
})
export class LetterpressComponent implements OnInit {

  templates:any;
  commonTemplates: any;
  brand:any;


  constructor(private route: ActivatedRoute, private router: Router, private _letterPressService: LetterpressService) { }

  ngOnInit() {

    this.route.params.subscribe((params: any) => {
      this.brand = params.brand
      this.getTemplates();
      this.getCommonTemplates();
      console.log(" this.brand vvvvvvvvvv", this.brand)
    });

    
  }

  getTemplates(){
    this._letterPressService.getTemplates(this.brand).subscribe(res=>{
      console.log("res in get letterpress", res)
      this.templates = res;
    })
  }

  getCommonTemplates(){
    this._letterPressService.getCommonTemplates(this.brand).subscribe(res=>{
      console.log("res in getCommonTemplates", res)
      this.commonTemplates = res;
    })
  }

}
