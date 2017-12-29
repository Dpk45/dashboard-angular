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
// import { LetterpressComponent } from './components/letterpress-component/letterpress-component.component'
import { DiscountComponent } from './components/discountCode/discount.component';
import { LetterPressComponent } from './components/Letterpress/letterPress.component';
import { EyewearComponent } from './components/eyewear-component/eyewear-component.component';
import { EyewearProcessComponent } from './components/eyewear-component/eyewear-process-component/eyewear-process-component.component';
import { HtkComponent } from './components/htk-component/htk-component.component';

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
            }]
        },

        {
          path: "htk/processing",
          component: HtkComponent
        }
      ]
    },
    {
      path: "store_locations/:brand",
      // component: StoreLocationComponent,
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
    // {
    //   path: "letterpress/:brand",
    //   component: LetterpressComponent,
    //   canActivate: [AuthGuard]
    //
    // },

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

  ];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
