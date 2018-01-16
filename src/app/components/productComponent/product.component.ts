import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { DashUserService } from '../../services/dashUser.service'
import { ProductService } from '../../services/product.service'

@Component({
  moduleId: module.id,
  selector: 'app-product',
  templateUrl: 'product.component.html',
})
export class ProductComponent  {
  brand: any;
  product_list: any;
  product_id: any;
  product: any;
  byProduct: boolean;
  createProduct: boolean;
  legacy_product_id: any;
  product_name: any;
  frame_color: any;
  lens_color: any;
  assets: any;
  sunwear: any;
  gender: any;
  //tags: any;
  description: any;
  details: any;
  social_id: any;
  upc_codes: any;
  NO_LENS_PRICE: any;
  STANDARD_INDEX_LENS_PRICE: any;
  HIGH_INDEX_LENS_PRICE: any;
  PRG_STANDARD_LENS_PRICE: any;
  PRG_HIGH_INDEX_LENS_PRICE: any;
  PLANO_LENS_PRICE: any;
  READING_LENS_PRICE: any;
  ORIGINAL_RX_PRICE: any;
  bridge: any;
  temple: any;
  lens_width: any;
  lens_height: any;
  name: any;
  updateProductdata: any;
  dashUserEmail: any;
  current_user: any;
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
           unSelectAllText: 'UnSelect All',
           classes: "myclass custom-class"
  };
  constructor(private route: ActivatedRoute, private _productService: ProductService, private _dashUserService: DashUserService, private router: Router) {
  this.current_user = JSON.parse(localStorage.getItem("current_user"));
  }
  ngOnInit(){
    this.route.params.subscribe((params: any) => {
    //  console.log("params>>>>>>>>>>>>>>>>>",params)
      this.brand = params.brand;
      this.getProducts();
      if(params.product_id) {
        this.product_id = params.product_id;
        this.foundProduct(this.product_id);
      }
      // if(params.new_product){
      //   console.log("inside>>>>>>>>>>>>.. param of new_product")
      //   this.createProductData();
      // }
    });

    this._dashUserService.getDashUserByEmail(this.current_user.email).subscribe((res) => {
    //  console.log("resposne>>>>>>..pPPPPPPPPPPPPP",res)
        this.dashUserEmail = res.email;
        // console.log("dashUserEmail>>>>>>>>>>>>>>>",this.dashUserEmail)
      })
      this.getTagList();
      this.getAssestGroup();
  }

  // get list of tags
  getTagList() {
    this._productService.getTagList(this.brand).subscribe((res: any) => {
      if(res.code == 200) {
        this.tagData = res.data;
           for (let i = 0; i < this.tagData.length; i++) {
           this.tagsValue.push({"id": i, "itemName": this.tagData[i]});
         }
       this.tagToPass = this.tagsValue;
      }
    }, (err) => {
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

  // get list of Product
  getProducts() {
    this._productService.getProducts(this.brand).subscribe((res: any) => {
      //  console.log("response>>>>>>>>>>>>>>>>", JSON.stringify((res.data[0])))
      if(res.code == 200) {
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
      if(res.code == 200) {
        this.byProduct = true;
        this.product = res.data[0];
           for (let i = 0; i < this.product.tags.length; i++) {
           this.tags.push({"id": i, "itemName": this.product.tags[i]});
         }
        // for(const i in this.product.assets) {
        //       this.assest.push({"id": 1, "itemName": i})
        //   }
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
    for(let i = 0; i < form.tags.length; i++) {
      tagValue.push(form.tags[i].itemName)
    }

    for(let i = 0; i < form.assets.length; i++) {
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
      "measurements":{
        "bridge": form.bridge,
        "temple": form.temple,
        "lens_width": form.lens_width,
        "lens_height": form.lens_height
      }
    }
    console.log("updateProductdata>>>>>>>>>>>>>>>>>>",this.updateProductdata)
    this._productService.updateProductById(this.brand, this.product_id,  this.updateProductdata).subscribe((res: any) => {
    //  console.log("re4pose updated>>>>>.......................",res)
      if(res.code == 200) {
          this.router.navigate(['/product', this.brand]);
      }
    },
    (err) => {
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
// // update product
//   createProductData() {
//     console.log("create product>>>>>>>>>>>>>>>>..")
//     this.createProduct = true;
//   }

}
