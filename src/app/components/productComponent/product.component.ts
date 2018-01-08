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
  legacy_product_id: any;
  product_name: any;
  frame_color: any;
  lens_color: any;
  assets: any;
  sunwear: any;
  gender: any;
  tags: any;
  constructor(private route: ActivatedRoute, private _productService: ProductService, private router: Router) {

  }
  ngOnInit(){
    this.route.params.subscribe((params: any) => {
      this.brand = params.brand;
       this.getProducts();
      if(params.product_id) {
        this.product_id = params.product_id;
        this.foundProduct(this.product_id);
      }
    });
  }

  // get list of ProductService
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
    //  console.log("response>>>>>>>>>>>>>>>>+++++++++++++++++++", res)
      if(res.code == 200) {
      this.byProduct = true;
      this.product = res.data[0];
      console.log("one product >>>>>>>>>>>>>>>>>", this.product)
    }
    },
    (err) => {
      console.log('error>>>>>>>>>>>>', err);
    })
  }

  updateProduct(form) {

  }

}
