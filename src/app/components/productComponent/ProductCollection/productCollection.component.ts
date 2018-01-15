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
  assest: any = [];
  productId: any = [];
  assestValue: any = [];
  assestVal: any = {};
  assestData: any = [];
  assestToPass: any = [];
  productValue: any = [];
  productData: any = [];
  productToPass: any = [];
  settings: any = {
            text: "Select Data",
           selectAllText: 'Select All',
           unSelectAllText: 'UnSelect All',
           classes: "myclass custom-class"
  };
  constructor(private route: ActivatedRoute, private _productService: ProductService, private router: Router) {
  this.dashUserEmail = JSON.parse(localStorage.getItem("current_user"));
  }


  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.brand = params.brand;
      this.getProductCollectionList();
      this.getProductsList();
      console.log("params>>>>>>>>>>>>>>>>>..", params)
      if(params.slug == 'new_product_collection') {
        this.isSuccess = true;
      }
      if(params.slug) {
        this.slug = params.slug;
        this.getProductCollectionBySlug(this.slug);
      }
    });
      this.getAssestGroup();
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
    // const assestValue = JSON.stringify(form['assets']);
      const productValue: any = [];
    for(let i = 0; i < form.assets.length; i++) {
      this.assestVal[form.assets[i].itemName] = [];
    }

    for(let i = 0; i < form.product_id.length; i++) {
      productValue.push(form.product_id[i].itemName)
    }
    this.data = {
      "assets": this.assestVal,
      "tiles": [{
        "products": productValue
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
    console.log("product data>>>>>>>>>..................", JSON.stringify(this.data))
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
  getProductsList() {
    this._productService.getProductsList(this.brand).subscribe((res: any) => {
      //  console.log("response>>>>>>>>>>>>>>>>", JSON.stringify((res.data[0])))
      if(res.code == 200) {
        this.productIds = res.data;
        for (let i = 0; i < this.productIds.length; i++) {
        this.productValue.push({"id": i, "itemName": this.productIds[i].product_id});
      }
    this.productToPass = this.productValue;
      }
    },
    (err) => {
      console.log('error>>>>>>>>>>>>', err);
    })
  }

  //get one product collection
  getProductCollectionBySlug(slug) {
    this._productService.getProductCollectionBySlug(this.brand, slug).subscribe((res: any) => {
    //   console.log("response>>>>>>>>>>>>>>>>", JSON.stringify(res.data))
      if(res.code == 200) {
    //    console.log("inside of iffffffffffffffffffffffffffff")
      this.isFoundSlug = true;
      this.productCollectionData = res.data;
    //  console.log("productCollectionData>>>>>>>>>>>>........................", JSON.stringify(this.productCollectionData))
      for(const i in this.productCollectionData.assets) {
            this.assest.push({"id": 1, "itemName": i})
        }

        for (let i = 0; i < this.productCollectionData.tiles.length; i++) {
        this.productId.push({"id": i, "itemName": this.productCollectionData.tiles[i].products[i].product_id});
      }
      console.log("**************************.............",this.productId)
    }
    },
    (err) => {
      console.log('error>>>>>>>>>>>>', err);
    })
  }

  //update product collection
  updateProductCollection(form) {
    console.log("form data value>>>>>>>....................", form)
  //  const updatedAssestValue = JSON.stringify(form['assets']);
  const productValue: any = [];
  for(let i = 0; i < form.product_id.length; i++) {
    productValue.push(form.product_id[i].itemName)
  }
  for(let i = 0; i < form.assets.length; i++) {
    this.assestVal[form.assets[i].itemName] = [];
  }
    this.data = {
      "assets": this.assestVal,
      "tiles": [{
        "products": productValue
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

  getAssestGroup() {
    this._productService.getAssetGroup(this.brand).subscribe((res: any) => {
      if(res.code == 200) {
        this.assestData = res.data;
           for (let i = 0; i < this.assestData.length; i++) {
           this.assestValue.push({"id": i, "itemName": this.assestData[i]});
         }
       this.assestToPass = this.assestValue;
      }
    }, (err) => {
      console.log('error>>>>>>>>>>>>', err);
    })
  }


  onItemSelect(item: any) {
        console.log(item);
    }
    OnItemDeSelect(item: any) {
        console.log(item);
    }
    onSelectAll(items: any) {
        console.log(items);
    }
    onDeSelectAll(items: any) {
        console.log(items);
    }

}
