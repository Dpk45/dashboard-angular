import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { routing, appRoutingProviders } from "./app.route"

import { AuthGuard } from './_guards/auth.guard';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home-component/home.component';
import { LoginComponent } from "./components/login-component/login.component";
import { HeaderComponent } from "./components/header-component/header.component"
import { ErrorComponent } from "./components/error-component/error.component"
import { UserComponent } from "./components/user-component/user.component"

import { DashAuthService } from "./services/dashAuth.service"
import { StorageService } from "./services/storage.service"
import { DashUserService } from "./services/dashUser.service"
import { UserService } from "./services/user.service";
import { OrdersService } from "./services/orders-service.service";
import { StoreLocationService } from "./services/store-location.service"
import { DiscountService } from './services/discount.service';
import { LetterPressService } from './services/letterPress.service';
import { ReportService } from './services/reports.service'

import { StoreLocationComponent } from './components/store-locations-component/store-locations-component.component';
import { DiscountComponent } from './components/discountCode/discount.component';
import { LetterPressComponent } from './components/Letterpress/letterPress.component';
import { StoreLocationDetailComponent } from './components/store-location-detail-component/store-location-detail-component.component';
import { OrdersComponent } from './components/orders-component/orders-component.component';
import { ReportOrderComponent } from './components/report/reportOrder/reportOrder.component';
import { ReportEmailComponent } from './components/report/reportEmail/reportEmail.component';
import { ReportComponent } from './components/report/report.component'
// import { ReportComponent } from './components/report/report.component'
import { EyewearComponent } from './components/eyewear-component/eyewear-component.component';
import { HtkComponent } from './components/htk-component/htk-component.component';
import { EyewearProcessComponent } from './components/eyewear-component/eyewear-process-component/eyewear-process-component.component';
import { OrderDetailComponent } from './components/order-detail-component/order-detail-component.component'


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
    ReportComponent,
    ReportOrderComponent,
    ReportEmailComponent,
    OrdersComponent,
    EyewearComponent,
    HtkComponent,
    EyewearProcessComponent,
    OrderDetailComponent,
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
    ReportService,
    OrdersService,
    DiscountService],
  bootstrap: [AppComponent]
})
export class AppModule { }
