import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DashUserService } from '../../../services/dashUser.service'
import { ProductService } from '../../../services/product.service'

@Component({
  selector: 'app-upload-asset',
  templateUrl: './upload-asset.component.html',
  styleUrls: ['./upload-asset.component.css']
})
export class UploadAssetComponent implements OnInit {
  brand: any;
  product_id: any;
  product: any;
  byProduct: boolean;
  objectKeys = Object.keys;
  assetObject: any


  constructor(private route: ActivatedRoute, private _productService: ProductService, private _dashUserService: DashUserService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      console.log("params >>>>.", params)
      this.brand = params.brand;
      // this.productComponent.getProducts();
      if (params.product_id) {
        this.product_id = params.product_id;
        this.foundProduct(this.product_id);
      }
    });
    // this.getTagList();
    // this.getAssestGroup();
  }

  // get product by product_id
  foundProduct(product_Id) {
    this._productService.getProductById(this.brand, product_Id).subscribe((res: any) => {
      if (res.code == 200) {
        this.byProduct = true;
        this.product = res.data[0];
        console.log("this.product >>>>>>>>>>>>>>>>>>>>", this.product)
        // for (let i = 0; i < this.product.tags.length; i++) {
        //   this.tags.push({ "id": i, "itemName": this.product.tags[i] });
        // }
        // for(const i in this.product.assets) {
        //       this.assest.push({"id": 1, "itemName": i})
        //   }
      }
    },
      (err) => {
        console.log('error>>>>>>>>>>>>', err);
      })
  }

  // editProduct(){
  //   this.byProduct = true;
  //   this.router.navigate(["/product/:brand"])
  // }

  /**
   * fileUpload Event
   * @param event
   */
  uploadAsset(event, asset) {
    let reader = new FileReader();
    reader.onload = () => {
      this.assetObject = {
        asset_group: asset,
        filename: event.target.files[0].name,
        data: btoa(reader.result),
      };
      console.log("this.assetObject >>>>>>>", this.assetObject)
      this._productService.uploadProductAsset(this.brand, this.product_id, this.assetObject).subscribe((res: any) => {
        if (res.code == 200) {
          console.log("uploaded succesfully ........")
        }
      })
    }
    if (event.target.files[0]) {
      reader.readAsBinaryString(event.target.files[0]);
    }
  }

}
