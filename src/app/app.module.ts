
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

@NgModule({
  declarations: [
      AppComponent,
      FixedNavbarFooterLayoutComponent,
      NotFoundComponent,
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
  ],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
      // NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
