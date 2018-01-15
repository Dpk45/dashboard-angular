import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { ProductService } from '../../../services/product.service'

@Component({
  moduleId: module.id,
  selector: 'app-collection',
  templateUrl: 'productCollection.component.html',
})

export class ProductCollectionComponent  {
  brand: any;
  product_collection_list: any;
  isSuccess: boolean;
  isFoundSlug: boolean;
  data: any;
  productIds: any;
  selectedProductId: any;
  slug: any;
  productCollectionData: any;
  dashUserEmail: any;
  slugValue: any;
  constructor(private route: ActivatedRoute, private _productService: ProductService, private router: Router) {
  this.dashUserEmail = JSON.parse(localStorage.getItem("current_user"));
  }


  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.brand = params.brand;
      this.getProductCollectionList();
      this.getProducts();
      console.log("params>>>>>>>>>>>>>>>>>..", params)
      if(params.slug == 'new_product_collection') {
        this.isSuccess = true;
      }
      if(params.slug) {
        this.slug = params.slug;
        this.getProductCollectionBySlug(this.slug);
      }
    });
  }

  // get product collection
  getProductCollectionList() {
    this._productService.getProductCollectionList(this.brand).subscribe((res: any) => {
      if(res.code == 200) {
        this.product_collection_list = res.data;
      }
    },
    (err) => {
      console.log('error>>>>>>>>>>>>', err);
    })
  }

  // create product collection
  createProductCollection(form) {
    const assestValue = JSON.stringify(form['assets']);
    this.data = {
      "assets": {
        assestValue: []            // we have to pass assestValue
      },
      "tiles": [{
        "products": [form.product_id]
      }],
      "name": form.name,
      "slug": form.slug,
      "h1": form.h1,
      "title": form.tag,
      "metaDescription": form.description,
      "metaKeywords": form.Keywords,
      "h2": form.h2,
      "richTextParagraph": form.paragraph
    }
    this._productService.createProductCollection(this.brand, this.data).subscribe((res: any) => {
      if(res.code == 200) {
      this.router.navigate(['/product_collection', this.brand]);
      }
    },
    (err) => {
      console.log('error>>>>>>>>>>>>', err);
    })
  }

  // get list of Product
  getProducts() {
    this._productService.getProducts(this.brand).subscribe((res: any) => {
      //  console.log("response>>>>>>>>>>>>>>>>", JSON.stringify((res.data[0])))
      if(res.code == 200) {
        this.productIds = res.data;
      }
    },
    (err) => {
      console.log('error>>>>>>>>>>>>', err);
    })
  }

  //get one product collection
  getProductCollectionBySlug(slug) {
    this._productService.getProductCollectionBySlug(this.brand, slug).subscribe((res: any) => {
       console.log("response>>>>>>>>>>>>>>>>", JSON.stringify(res.data))
      if(res.code == 200) {
        console.log("inside of iffffffffffffffffffffffffffff")
      this.isFoundSlug = true;
      this.productCollectionData = res.data;
    }
    },
    (err) => {
      console.log('error>>>>>>>>>>>>', err);
    })
  }

  //update product collection
  updateProductCollection(form) {
    console.log("form data value>>>>>>>....................", form)
    const updatedAssestValue = JSON.stringify(form['assets']);
    this.data = {
      "assets": {
        updatedAssestValue: []            // we have to pass assestValue
      },
      "tiles": [{
        "products": [form.product_id]
      }],
      "name": form.name,
      "slug": form.slug,
      "h1": form.h1,
      "title": form.tag,
      "metaDescription": form.description,
      "metaKeywords": form.Keywords,
      "h2": form.h2,
      "richTextParagraph": form.paragraph
    }
    this._productService.updateProductCollection(this.brand, this.data, form.slug).subscribe((res: any) => {
      if(res.code == 200) {
      this.router.navigate(['/product_collection', this.brand]);
      }
    },
    (err) => {
      console.log('error>>>>>>>>>>>>', err);
    })
  }
}
