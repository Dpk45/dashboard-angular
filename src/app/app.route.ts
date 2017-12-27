import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthGuard } from './_guards/auth.guard';

import { LoginComponent } from "./components/login-component/login.component"
import { HomeComponent } from "./components/home-component/home.component"
import { HeaderComponent } from "./components/header-component/header.component"
import { UserComponent } from "./components/user-component/user.component"
import {ErrorComponent} from "./components/error-component/error.component"
import { StoreLocationComponent } from './components/store-locations-component/store-locations-component.component'
import { LetterpressComponent } from './components/letterpress-component/letterpress-component.component'


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
            component: StoreLocationComponent,
            canActivate: [AuthGuard]

        },
        {
            path: "letterpress/:brand",
            component: LetterpressComponent,
            canActivate: [AuthGuard]

        },
        {
            path: "error",
            component: ErrorComponent
        },

    ];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);