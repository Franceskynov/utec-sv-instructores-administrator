
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'app/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from 'app/app.component';
import { FixedNavbarFooterLayoutComponent } from 'app/layouts/fixed-navbar-footer-layout/fixed-navbar-footer-layout.component';
import { AuthService } from 'app/shared/auth/auth.service';
import { AuthGuard } from 'app/shared/auth/auth-guard.service';
import * as $ from 'jquery';
import { routing } from 'app/app.routing';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { ToastrModule } from 'ngx-toastr';
import { environment } from 'environments/environment';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NotFoundComponent } from 'app/components/not-found/not-found.component';
import { LoaderService } from 'app/services/loader.service';
import { LoaderInterceptor } from 'app/interceptors/loader.interceptor';
import { AuthInterceptor } from 'app/interceptors/token.interceptor';
import { LoaderComponent } from 'app/components/loader/loader.component';
import { HttpErrorInterceptor } from 'app/interceptors/http-error.interceptor';
import { UserIdleModule } from 'angular-user-idle';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { CredentialsComponent } from './components/credentials/credentials.component';
import { UtilModule } from 'app/modules/util/util.module';

@NgModule({
  declarations: [
      AppComponent,
      FixedNavbarFooterLayoutComponent,
      NotFoundComponent,
      LoaderComponent,
      WelcomeComponent,
      CredentialsComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    routing,
    SharedModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot({
        timeOut: environment.TOASTER_TIMEOUT,
    }),
    UserIdleModule.forRoot({
      idle: environment.IDLE_SETTINGS.IDLE,
      timeout: environment.IDLE_SETTINGS.TIMEOUT,
      ping: environment.IDLE_SETTINGS.PING
    }),
    UtilModule,

  ],
  providers: [
    LoaderService,
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },

  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
      // NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
