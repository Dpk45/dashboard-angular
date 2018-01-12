import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { ProductService } from '../../../services/product.service'

@Component({
  moduleId: module.id,
  selector: 'app-newcollection',
  templateUrl: 'newProductCollection.component.html',
})

export class NewCollectionComponent  {
  dashUserEmail: any;
  brand: any;
  data: any;
  constructor(private route: ActivatedRoute, private _productService: ProductService, private router: Router) {
  this.dashUserEmail = JSON.parse(localStorage.getItem("current_user"));
  }


  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      console.log("PPPPPPPPPPPPPPPPPPPPPPPp", params)
      this.brand = params.brand;
    });
  }

  // // create product collection
  // createProductCollection(form) {
  //   const assestValue = JSON.stringify(form['assets']);
  //   this.data = {
  //     "assets": {
  //       assestValue: []            // we have to pass assestValue
  //     },
  //     "tiles": [{
  //       "products": [form.product_id]
  //     }],
  //     "name": form.name,
  //     "slug": form.slug,
  //     "h1": form.h1,
  //     "title": form.tag,
  //     "metaDescription": form.description,
  //     "metaKeywords": form.Keywords,
  //     "h2": form.h2,
  //     "richTextParagraph": form.paragraph
  //   }
  //   this._productService.createProductCollection(this.brand, this.data).subscribe((res: any) => {
  //     if(res.code == 200) {
  //     this.router.navigate(['/product_collection', this.brand]);
  //     }
  //   },
  //   (err) => {
  //     console.log('error>>>>>>>>>>>>', err);
  //   })
  // }
}
