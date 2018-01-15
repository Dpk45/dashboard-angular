import {Component, OnInit} from '@angular/core';
import {InventoryService} from '../../services/inventory.service';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  moduleId: module.id,
  selector : 'app-inventory',
  templateUrl: 'inventory.component.html'
})

export class InventoryComponent {
  productId: any;
  selectedValue: any = 'Adjust Values';
  foundedProductId: boolean;
  byProductId: any = [];
  brand: any;
  valueToPass: any;
  updateAdjustInventoryData: any;
  warehouse: any;
  htk_quantity: any;
  tro: any;
  kmarsoptical: any;
  isSuccess: boolean;
  formdata: any;
  file: any;
  constructor(private route: ActivatedRoute, private _inventoryService: InventoryService, private router: Router) {

  }

  ngOnInit(){
    this.route.params.subscribe((params:any) => {
      this.brand = params.brand;
      if(params.productId) {
        this.productId = params.productId
        this.getInventoryByProduct(this.productId);
      }
    });
  }

  // get Inventory by product_id
  getInventoryByProduct(productId) {
    this.productId = productId;
    this._inventoryService.getInventoryByProduct(this.productId, this.brand).subscribe(res => {
      if(res.code == 200) {
        // get product by product_id
        this._inventoryService.getProductByProduct(this.productId, this.brand).subscribe(res => {
          if(res.code == 200){
            this.byProductId = res.data;
          }
        }, (err) => {
          console.log('error>>>>>>>>>>>>', err);
        })
        this.foundedProductId = true;
        delete res.data.carted;
        delete res.data.brand_id;
        this.valueToPass = JSON.stringify(res.data);
      }
    }, (err) => {
      console.log('error>>>>>>>>>>>>', err);
    })
  }

  // update inventory by product_id
  updateAdjustInventory(form) {
    this.warehouse = form.warehouse;
    this.htk_quantity = form.htk_quantity;
    this.tro = form.tro;
    this.kmarsoptical = form.kmarsoptical;
    this._inventoryService.updateInventoryByProduct(this.warehouse, this.htk_quantity, this.tro, this.kmarsoptical, this.productId, this.brand).subscribe(res => {
      if(res.code == 200){
          this.updateAdjustInventoryData = JSON.stringify(res);
      }

    }, (err) => {
      console.log('error>>>>>>>>>>>>', err);
    })
  }

  // upload Inventory
  uploadInventory() {
    this.formdata = new FormData()
    if (document.getElementById('inventory_file') && ( < HTMLInputElement > document.getElementById('inventory_file')).files.length) {
        this.file = (<HTMLInputElement> document.getElementById('inventory_file')).files[0];
    }
    this.formdata.append('file', this.file);
    this._inventoryService.uploadInventory(this.formdata, this.brand).subscribe(res => {
      if(res.code == 200) {
        this.isSuccess = true;
        //this.router.navigate(['/inventory', this.brand]);
        }
      }, (err) => {
      console.log('error>>>>>>>>>>>>', err);
    })
  }
}
