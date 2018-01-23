import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DashUserService } from '../../../services/dashUser.service'
import { ProductService } from '../../../services/product.service'
import { UploadEvent, UploadFile } from 'ngx-file-drop';

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
  files: any

  constructor(private route: ActivatedRoute, private _productService: ProductService, private _dashUserService: DashUserService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      console.log("params >>>>.", params)
      this.brand = params.brand;
      if (params.product_id) {
        this.product_id = params.product_id;
        this.foundProduct(this.product_id);
      }
    });
  }

  // get product by product_id
  foundProduct(product_Id) {
    this._productService.getProductById(this.brand, product_Id).subscribe((res: any) => {
      if (res.code == 200) {
        this.byProduct = true;
        this.product = res.data[0];
      }
    },
      (err) => {
        console.log('error>>>>>>>>>>>>', err);
      })
  }


  public dropped(event: UploadEvent, asset) {
    try {
      this.files = event.files;
      for (const file of event.files) {
        file.fileEntry.file(info => {
          console.log(info);
          let reader = new FileReader();
          reader.onload = () => {
            this.assetObject = {
              asset_group: asset,
              filename: info.name,
              data: btoa(reader.result)
            };
            this._productService.uploadProductAsset(this.brand, this.product_id, this.assetObject).subscribe((res: any) => {
              if (res.code == 200) {
                console.log("uploaded succesfully ........")
              }
            }, error => {
              console.log("error", error.error.data)
              return error.error.data.message;
            })
          }
          if (info) {
            reader.readAsBinaryString(info);
          }
        });
      }
    } catch (err) {
      console.log("error", err)
    }
  }


  removeAsset(assetGroup, index) {
    this.product.assets[assetGroup].splice(index, 1);
  }


  removeAssetGroup(assetGroup) {
    if (confirm("This will remove the " + assetGroup + " group and all assets inside it.")) {
      delete this.product.assets[assetGroup];
    }
  }

  updateProductAsset() {
    this._productService.updateProductById(this.brand, this.product.product_id, this.product).subscribe((res: any) => {
      if (res.code == 200) {
      }
    }, error => {
      console.log("error", error.error.data)
      return error.error.data.message;
    })
  }

}
