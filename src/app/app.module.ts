import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { routing, appRoutingProviders } from "./app.route"

import { AuthGuard } from './_guards/auth.guard';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { AppComponent } from './app.component';
import {HomeComponent} from './components/home-component/home.component';
import {LoginComponent} from "./components/login-component/login.component";
import {HeaderComponent} from "./components/header-component/header.component"
import {ErrorComponent} from "./components/error-component/error.component"
import { UserComponent } from "./components/user-component/user.component"

import {DashAuthService} from "./services/dashAuth.service"
import {StorageService} from "./services/storage.service"
import { DashUserService } from "./services/dashUser.service"
import { UserService } from "./services/user.service";
import {StoreLocationService} from "./services/store-location.service"
//import {LetterpressService} from "./services/letterpress.service";
import {DiscountService} from './services/discount.service';
import {LetterPressService} from './services/letterPress.service';

//import { LetterpressComponent } from './components/letterpress-component/letterpress-component.component';
import { StoreLocationComponent } from './components/store-locations-component/store-locations-component.component';
import {DiscountComponent} from './components/discountCode/discount.component';
import {LetterPressComponent} from './components/Letterpress/letterPress.component';
import { StoreLocationDetailComponent } from './components/store-location-detail-component/store-location-detail-component.component';
import { OrdersComponent } from './components/orders-component/orders-component.component'


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    UserComponent,
    ErrorComponent,
  //  LetterpressComponent,
    StoreLocationComponent,
    StoreLocationDetailComponent,
    DiscountComponent,
    LetterPressComponent,
    OrdersComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    routing
  ],
  providers: [
    appRoutingProviders,
    AuthGuard,
    DashAuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    StorageService,
    DashUserService,
    UserService,
    StoreLocationService,
    LetterPressService,
  DiscountService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
