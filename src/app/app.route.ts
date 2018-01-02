import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthGuard } from './_guards/auth.guard';

import { LoginComponent } from "./components/login-component/login.component"
import { HomeComponent } from "./components/home-component/home.component"
import { HeaderComponent } from "./components/header-component/header.component"
import { UserComponent } from "./components/user-component/user.component"
import {ErrorComponent} from "./components/error-component/error.component"
import { StoreLocationDetailComponent } from './components/store-location-detail-component/store-location-detail-component.component'
import { StoreLocationComponent } from './components/store-locations-component/store-locations-component.component'
// import { LetterpressComponent } from './components/letterpress-component/letterpress-component.component'
import {DiscountComponent} from './components/discountCode/discount.component';
import {LetterPressComponent} from './components/Letterpress/letterPress.component';
import { ReportComponent } from './components/report/report.component';
import { ReportOrderComponent } from './components/report/reportOrder/reportOrder.component';
import { ReportEmailComponent } from './components/report/reportEmail/reportEmail.component';
import { ErpComponent } from './components/sendErpRequest/sendERP.component';
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
    path: "users/:brand",
    component: UserComponent,
    canActivate: [AuthGuard]

  },
  {
    path: "store_locations/:brand",
    // component: StoreLocationComponent,
    canActivate: [AuthGuard],
    children:[
      {
        path:"",
        component: StoreLocationComponent
      },
      {
        path:"new_store",
        component: StoreLocationDetailComponent
      }
      ,
      {
        path:":kioskId",
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
    component: DiscountComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'letterpress/:brand',
    component: LetterPressComponent,
    canActivate: [AuthGuard]
  },

  {
    path: "error",
    component: ErrorComponent
  },

  {
    path: '',
    // component: ReportComponent,
    canActivate: [AuthGuard],
    children:[
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

];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
