import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { FormsModule } from '@angular/forms';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { routing, appRoutingProviders } from "./app.route";
//import { MaterialModule } from '@angular/material';
//import { MatSelectModule } from '@angular/material';
//import { MultiselectDropdown } from './multiselect-dropdown';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';

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
import { ErpService } from './services/sendErp.service'
import { InventoryService } from './services/inventory.service'
import { HomeService } from './services/home.service'
import { ProductService } from './services/product.service'
import { LookupService } from './services/lookup.service'

import { StoreLocationComponent } from './components/store-locations-component/store-locations-component.component';
import { DiscountComponent } from './components/discountCode/discount.component';
import { LetterPressComponent } from './components/Letterpress/letterPress.component';
import { LetterPressPreviewComponent } from './components/Letterpress/letterPressPreview.component';
import { StoreLocationDetailComponent } from './components/store-location-detail-component/store-location-detail-component.component';
import { ReportOrderComponent } from './components/report/reportOrder/reportOrder.component';
import { ReportEmailComponent } from './components/report/reportEmail/reportEmail.component';
import { ReportComponent } from './components/report/report.component'
import { ErpComponent } from './components/sendErpRequest/sendERP.component';
import { EyewearComponent } from './components/eyewear-component/eyewear-component.component';
import { HtkComponent } from './components/htk-component/htk-component.component';
import { EyewearProcessComponent } from './components/eyewear-component/eyewear-process-component/eyewear-process-component.component';
import { OrderDetailComponent } from './components/order-detail-component/order-detail-component.component'
import { InventoryComponent } from './components/inventoryComponent/inventory.component';
import { ProductComponent } from './components/productComponent/product.component';
import { NewProductComponent } from './components/productComponent/newProductComponent/newProduct.component';
import { ProductCollectionComponent } from './components/productComponent/ProductCollection/productCollection.component';
import { FrameComponent } from './components/lookupComponent/lookupFrame/lookupFrame.component';
import {StyleComponent} from './components/lookupComponent/lookupStyle/lookupStyle.component';
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    UserComponent,
    ErrorComponent,
    ErpComponent,
    InventoryComponent,
    StoreLocationComponent,
    StoreLocationDetailComponent,
    DiscountComponent,
    LetterPressComponent,
    ReportComponent,
    ReportOrderComponent,
    ReportEmailComponent,
    EyewearComponent,
    HtkComponent,
    EyewearProcessComponent,
    OrderDetailComponent, StyleComponent,
    ProductComponent, NewProductComponent, ProductCollectionComponent, LetterPressPreviewComponent, FrameComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    routing,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    BrowserAnimationsModule, AngularMultiSelectModule
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
    ErpService,
    ReportService ,
    ReportService,
    OrdersService,
    DiscountService,
  InventoryService,
  HomeService,
ProductService,
LookupService],
  bootstrap: [AppComponent]
})
export class AppModule { }
