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
import { UserService } from "./services/user.service"


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    UserComponent,
    ErrorComponent
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
    UserService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
