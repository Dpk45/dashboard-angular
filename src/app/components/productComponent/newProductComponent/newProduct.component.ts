import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { ProductService } from '../../../services/product.service'

@Component({
  moduleId: module.id,
  selector: 'app-newproduct',
  templateUrl: 'newProduct.component.html',
})

export class NewProductComponent  {
  brand: any;
  ProductData: boolean;
  style: any;
  styleNames: any = [];
  frame: any;
  frameColor: any = [];
  len: any;
  lenColors: any = [];
  productType: any;
  productTypeData: any = [];
  selectedStyle: any = "Amherst";
  selectedFrame: any = "Aqua Crystal";
  selectedLensColor: any = "Plain";
  selectedProductType: any = "Non-Rx Sun Only";
  selectedGender: any = "Men's";
  productData: any;
  constructor(private route: ActivatedRoute, private _productService: ProductService, private router: Router) {

  }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.brand = params.brand;
      this.getLookupStyleData();
      this.getFrameColor();
      this.getLenColor();
      this.getTemplateMap();
    });
  }

  // get style_table
    getLookupStyleData() {
      this._productService.getLookupStyleData(this.brand).subscribe((res: any) => {
         //console.log("res styleZ>>>>>>>>>>>>>>>>>>>",res)
        if(res.code == 200) {
          this.style = res.data;
          for (let i = 0; i < this.style.length; i++) {
          this.styleNames.push(this.style[i].name)
        }
      }
      }, (err) => {
        console.log('error>>>>>>>>>>>>', err);
      })
}

// get frame_color table
getFrameColor() {
  this._productService.getFrameColor(this.brand).subscribe((res: any) => {
    // console.log("res styleZ>>>>>>>>>>>>>>>>>>>",res)
    if(res.code == 200) {
      this.frame = res.data;
      for (let i = 0; i < this.frame.length; i++) {
      this.frameColor.push(this.frame[i].name)
    }
  }
  }, (err) => {
    console.log('error>>>>>>>>>>>>', err);
  })
}

// get len_colors table
getLenColor() {
  this._productService.getLenColor(this.brand).subscribe((res: any) => {
    if(res.code == 200) {
      this.len = res.data;
    //   for (let i = 0; i < this.len.length; i++) {
    //   this.lenColors.push(this.len[i].name)
    // }
  }
  }, (err) => {
    console.log('error>>>>>>>>>>>>', err);
  })
}

// get template_map table
getTemplateMap() {
  this._productService.getTemplateMap(this.brand).subscribe((res: any) => {
    if(res.code == 200) {
      this.productType = res.data;
    //   for (let i = 0; i < this.productType.length; i++) {
    //   this.productTypeData.push(this.productType[i].name)
    //   //console.log("productTypeData>>>>>>>>>>>>>>>>>>>>>",this.productTypeData)
    // }
  }
  }, (err) => {
    console.log('error>>>>>>>>>>>>', err);
  })
}

// create product
  createProduct(form) {
  console.log("form>>>>>>>>>..create product>>>>>>>>>", JSON.stringify(form))
  this.productData = {
    "legacy_product_id": form.legacy_product_id,
    "name": form.name,
    "color": form.frame_color,
    "lens_color": form.lens_color,
    "product_gender": form.gender,
    "tags": [form.tags],
    "description": form.description,
    // "assets": {
    //   "form.assets" = []   //"front-eyewear-thumb": []
    // },

    "assets": {},
    "details": form.details,
    "social_id": form.social_id,
    "upc_code": form.upc_code,
    "prices": {
      "NO_LENS_PRICE": form.NO_LENS_PRICE,
      "STANDARD_INDEX_LENS_PRICE": form.STANDARD_INDEX_LENS_PRICE,
      "HIGH_INDEX_LENS_PRICE": form.HIGH_INDEX_LENS_PRICE,
      "PRG_STANDARD_LENS_PRICE": form.PRG_STANDARD_LENS_PRICE,
      "PRG_HIGH_INDEX_LENS_PRICE": form.PRG_HIGH_INDEX_LENS_PRICE,
      "PLANO_LENS_PRICE": form.PLANO_LENS_PRICE,
      "READING_LENS_PRICE": form.READING_LENS_PRICE,
      "ORIGINAL_RX_PRICE": form.ORIGINAL_RX_PRICE,
      "RX_SUN_LENS_PRICE": form.RX_SUN_LENS_PRICE,
      "NON_RX_SUN_LENS_PRICE": form.NON_RX_SUN_LENS_PRICE,
      "PRG_RX_SUN_LENS_PRICE": form.PRG_RX_SUN_LENS_PRICE,
      "ORIGINAL_SUN_PRICE": form.ORIGINAL_SUN_PRICE
    },
    "measurements":{
      "bridge": form.bridge,
      "temple": form.temple,
      "lens_width": form.lens_width,
      "lens_height": form.lens_height
    }
  }
  console.log("productData ***************888888888888888888888888",JSON.stringify(this. productData))
  this._productService.createProduct(this.brand, this.productData).subscribe((res: any) => {
    console.log("re4pose updated>>>>>.......................",res)
    if(res.code == 200) {
      //  this.router.navigate(['/product', this.brand]);
    }
  },
  (err) => {
    console.log('error>>>>>>>>>>>>', err);
  })
  }
}
