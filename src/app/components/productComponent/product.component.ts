import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DashUserService } from '../../services/dashUser.service'
import { ProductService } from '../../services/product.service'

@Component({
  moduleId: module.id,
  selector: 'app-product',
  templateUrl: 'product.component.html',
})
export class ProductComponent {
  brand: any;
  product_list: any;
  product_id: any;
  product: any;
  byProduct: boolean;
  createProduct: boolean;
  product_name: any;
  updateProductdata: any;
  tags: any = [];
  tagsValue: any = [];
  tagData: any = [];
  tagToPass: any = [];
  assest: any = [];
  assestValue: any = [];
  assestData: any = [];
  assestToPass: any = [];
  assestVal: any = {};
  settings: any = {
    text: "Select Data",
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All'
  };
  isDesc: boolean = false;
  column: string;
  direction: number;
  description: any;
  constructor(private route: ActivatedRoute, private _productService: ProductService, private _dashUserService: DashUserService, private router: Router) {
  }
  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.brand = params.brand;
      this.getProducts();
      if (params.product_id) {
        this.product_id = params.product_id;
        this.foundProduct(this.product_id);
      }
    });
    this.getTagList();
    this.getAssestGroup();
  }

  // get list of tags
  getTagList() {
    this._productService.getTagList(this.brand).subscribe((res: any) => {
      if (res.code == 200) {
        this.tagData = res.data;
        for (let i = 0; i < this.tagData.length; i++) {
          this.tagsValue.push({ "id": i, "itemName": this.tagData[i] });
        }
        this.tagToPass = this.tagsValue;
      }
    }, (err) => {
      console.log('error>>>>>>>>>>>>', err);
    })
  }

  getAssestGroup() {
    this._productService.getAssetGroup(this.brand).subscribe((res: any) => {
      if (res.code == 200) {
        this.assestData = res.data;
        for (let i = 0; i < this.assestData.length; i++) {
          this.assestValue.push({ "id": i, "itemName": this.assestData[i] });
        }
        this.assestToPass = this.assestValue;
      }
    }, (err) => {
      console.log('error>>>>>>>>>>>>', err);
    })
  }

  // get list of Product
  getProducts() {
    this._productService.getProducts(this.brand).subscribe((res: any) => {
      //  console.log("response>>>>>>>>>>>>>>>>", JSON.stringify((res.data[0])))
      if (res.code == 200) {
        this.product_list = res.data;
      }
      // const productName: any = [];
      // for (let i = 0; i < this.product_list.length; i++) {
      //   if (this.product_list[i].name) {
      //     productName.push(this.product_list[i].name);
      //   }
      // }
      // console.log("productName>>>>>>>>>>>>>>>...............",productName)
    },
      (err) => {
        console.log('error>>>>>>>>>>>>', err);
      })
  }

  // get product by product_id
  foundProduct(product_Id) {
    this._productService.getProductById(this.brand, product_Id).subscribe((res: any) => {
      if (res.code == 200) {
        this.byProduct = true;
        this.product = res.data[0];
        for (let i = 0; i < this.product.tags.length; i++) {
          this.tags.push({ "id": i, "itemName": this.product.tags[i] });
        }
        // console.log("this.product.assets >>>>>>.....................", this.product.assets)
        // for(const i in this.product.assets) {
        //       this.assest.push({"id": 1, "itemName": i})
        //   }
        //   console.log("assest >>>>>>>>>>>>>>>>>.", this.assest)
      }
    },
      (err) => {
        console.log('error>>>>>>>>>>>>', err);
      })
  }

  // update product
  updateProduct(form) {
    console.log("form>>>>>>>>>>>>>>>>>>>>>>>>>>..........", form)
    this.product_id = form.product_id;
    const tagValue: any = [];
    for (let i = 0; i < form.tags.length; i++) {
      tagValue.push(form.tags[i].itemName)
    }

    for (let i = 0; i < form.assets.length; i++) {
      this.assestVal[form.assets[i].itemName] = [];
    }
    this.updateProductdata = {
      "product_id": form.product_id,
      "legacy_product_id": form.legacy_product_id,
      "name": form.name,
      "frame_color": form.frame_color,
      "lens_color": form.lens_color,
      "product_gender": form.gender,
      "tags": tagValue,
      "description": form.description,
      "assets": this.assestVal,
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
      "measurements": {
        "bridge": form.bridge,
        "temple": form.temple,
        "lens_width": form.lens_width,
        "lens_height": form.lens_height
      }
    }
    this._productService.updateProductById(this.brand, this.product_id, this.updateProductdata).subscribe((res: any) => {
      if (res.code == 200) {
        this.router.navigate(['/product', this.brand]);
      }
    },
      (err) => {
        console.log('error>>>>>>>>>>>>', err);
      })
  }

// assign upc_code
assignUpcCode(assignUpcCode) {
  console.log("assignUpcCode ++++++++++++======= ", assignUpcCode)
this.description = {
  'description' : assignUpcCode
}
this._productService.assignUpcCode(this.brand, this.product_id, this.description).subscribe((res: any) => {
  console.log("response >>>>>>>>>>>>..................", JSON.stringify(res.data))
  if (res.code == 200) {
  this.UpcCode = res.data[1];
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
