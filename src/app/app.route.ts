import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthGuard } from './_guards/auth.guard';

import { LoginComponent } from "./components/login-component/login.component"
import { HomeComponent } from "./components/home-component/home.component"
import { HeaderComponent } from "./components/header-component/header.component"
import { UserComponent } from "./components/user-component/user.component"
import { ErrorComponent } from "./components/error-component/error.component"
import { StoreLocationDetailComponent } from './components/store-location-detail-component/store-location-detail-component.component'
import { StoreLocationComponent } from './components/store-locations-component/store-locations-component.component'
import { ReportComponent } from './components/report/report.component';
import { ReportOrderComponent } from './components/report/reportOrder/reportOrder.component';
import { ReportEmailComponent } from './components/report/reportEmail/reportEmail.component';
import { ErpComponent } from './components/sendErpRequest/sendERP.component';
import { DiscountComponent } from './components/discountCode/discount.component';
import { LetterPressComponent } from './components/Letterpress/letterPress.component';
import { EyewearComponent } from './components/eyewear-component/eyewear-component.component';
import { EyewearProcessComponent } from './components/eyewear-component/eyewear-process-component/eyewear-process-component.component';
import { HtkComponent } from './components/htk-component/htk-component.component';
import { OrderDetailComponent } from './components/order-detail-component/order-detail-component.component';
import { InventoryComponent } from './components/inventoryComponent/inventory.component';
import { ProductComponent } from './components/productComponent/product.component';
import { NewProductComponent } from './components/productComponent/newProductComponent/newProduct.component';
import { ProductCollectionComponent } from './components/productComponent/ProductCollection/productCollection.component';
import { LetterPressPreviewComponent } from './components/Letterpress/letterPressPreview.component';
import { UserDetailComponent } from './components/user-component/user-detail/user-detail.component';
//import { NewCollectionComponent } from './components/productComponent/ProductCollection/newProductCollection.component';

const appRoutes: Routes =
  [
    {
      path: "",
      component: LoginComponent
    },

    {
      path: "home",
      component: HomeComponent,
      canActivate: [AuthGuard]
    },
    {
      path: "",
      // component: UserComponent,
      canActivate: [AuthGuard],
      children: [
        {
          path: "users/:brand",
          component: UserComponent
        },
        {
          path: "users/:brand/:email/view",
          component: UserDetailComponent
        }
      ]
    },
    {
      path: "orders",
      canActivate: [AuthGuard],
      children: [
        {
          path: "",
          children: [
            {
              path: "eyewear",
              component: EyewearComponent
            },
            {
              path: "eyewear/:brand/processing",
              component: EyewearProcessComponent
            },
            {
              path: "htk/processing",
              component: HtkComponent
            },
            {
              path: ":brand/:order_id/view",
              component: OrderDetailComponent
            }
          ]
        }
      ]
    },
    {
      path: "store_locations/:brand",
      canActivate: [AuthGuard],
      children: [
        {
          path: "",
          component: StoreLocationComponent
        },
        {
          path: "new_store",
          component: StoreLocationDetailComponent
        }
        ,
        {
          path: ":kioskId",
          component: StoreLocationDetailComponent
        }
      ]
    },
    {
      path: "send_erp_request/:brand",
      component: ErpComponent,
      canActivate: [AuthGuard]
    },

    {
      path: 'discount/:brand',
      canActivate: [AuthGuard],
      children: [
        {
          path: "",
          component: DiscountComponent
        },
        {
          path: ":discount_code",
          component: DiscountComponent
        }]
    },
    {
      path: '',
      canActivate: [AuthGuard],
      children: [
        {
          path: "letterpress/:brand",
          component: LetterPressComponent
        },
        {
          path: "letterpress/:brand/:name",
          component: LetterPressComponent
        },
        {
          path: "letterpress/:brand/:name/preview",
          component: LetterPressPreviewComponent
        }
      ]
    },
    {
      // path: "error",
      // component: ErrorComponent

      path: '',
      // component: ReportComponent,
      canActivate: [AuthGuard],
      children: [
        {
          path: "error",
          component: ErrorComponent
        },
        {
          path: "error/:brand/:order_id",
          component: ErrorComponent
        }]
    },

    {
      path: '',
      // component: ReportComponent,
      canActivate: [AuthGuard],
      children: [
        {
          path: "reports",
          component: ReportComponent
        },
        {
          path: "reports/:brand/list_all",
          component: ReportOrderComponent
        },
        {
          path: "reports/:brand/email",
          component: ReportEmailComponent
        }

      ]
    },
    {
      path: "",
      //  component: ProductComponent,
      canActivate: [AuthGuard],
      children: [
        {
          path: "product/:brand",
          component: ProductComponent
        },
        {
          path: 'product/:brand/new_product',
          component: NewProductComponent
        },
        {
          path: 'product/:brand/:product_id',
          component: ProductComponent
        },
        {
          path: 'product_collection/:brand',
          component: ProductCollectionComponent
        },
        {
          path: 'product_collection/:brand/:slug',
          component: ProductCollectionComponent
        },
        {
          path: 'product_collection/:brand/new_product_collection',
          component: ProductCollectionComponent
        }]
    },

    {
      path: "inventory/:brand",
      //component: InventoryComponent,
      canActivate: [AuthGuard],
      children: [
        {
          path: "",
          component: InventoryComponent
        },
        {
          path: ":productId",
          component: InventoryComponent
        }
      ]

    }

  ];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
