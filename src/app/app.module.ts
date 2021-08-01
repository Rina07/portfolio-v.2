import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Provider } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PortfolioComponent } from './main-page/portfolio/portfolio.component';
import { HeaderComponent } from './main-page/header/header.component';
import { PortfolioListComponent } from './main-page/portfolio/portfolio-list/portfolio-list.component';
import { PortfolioItemComponent } from './main-page/portfolio/portfolio-list/portfolio-item/portfolio-item.component';
import { PrintPageComponent } from './print-page/print-page.component';
import { AuthComponent } from './login/auth/auth.component';
import { MainPageComponent } from './main-page/main-page.component';
import { HeaderAuthComponent } from './login/auth/header-auth/header-auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './login/auth/auth.service';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { DashboardComponent } from './login/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../app/login/shared/shared.module';
import { CreateItemComponent } from './login/create-item/create-item.component';
import { EditItemComponent } from './login/edit-item/edit-item.component';
import { SearchPipe } from '../app/login/shared/search.pipe';
import { AuthGuard } from '../app/login/auth/auth.guard';
import { AuthInterceptor } from './shared/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
}
@NgModule({
  declarations: [
    AppComponent,
    PortfolioComponent,
    HeaderComponent,
    PortfolioListComponent,
    PortfolioItemComponent,
    PrintPageComponent,
    AuthComponent,
    MainPageComponent,
    HeaderAuthComponent,
    LoadingSpinnerComponent,
    DashboardComponent,
    LoginComponent,
    CreateItemComponent,
    EditItemComponent,
    SearchPipe    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })      
  ],
  providers: [INTERCEPTOR_PROVIDER, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
