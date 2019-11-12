import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup,  ReactiveFormsModule, Validators,  FormsModule } from '@angular/forms';

import { InputErrorMessagesComponent } from 'app/components/input-error-messages/input-error-messages.component';
import { UploadComponent } from 'app/components/upload/upload.component';
import { ReaderComponent } from 'app/components/reader/reader.component';
import { CartComponent } from 'app/components/cart/cart.component';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { environment } from 'environments/environment';
import { NgSelectModule } from '@ng-select/ng-select';

import { FilterPipe } from 'app/pipes/filter.pipe';
import { SafePipe } from 'app/pipes/safe.pipe';
import { OnlynumberDirective } from './directives/onlynumber.directive';
import { NgxMaskModule } from 'ngx-mask';
import { NgxPaginationModule } from 'ngx-pagination';
import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ArchwizardModule } from 'angular-archwizard';
import { RangeSliderComponent } from 'app/components/range-slider/range-slider.component';

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    NgbModule,

    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    NgxMaskModule.forRoot(),
    NgxPaginationModule,
    // NgbModule.forRoot(),
    PasswordStrengthMeterModule,
    PerfectScrollbarModule,
    ArchwizardModule,
  ],
  declarations: [
    InputErrorMessagesComponent,
    FilterPipe,
    ReaderComponent,
    UploadComponent,
    OnlynumberDirective,
    CartComponent,
    SafePipe,
    RangeSliderComponent,
  ],
  exports: [
    InputErrorMessagesComponent,
    NgxDatatableModule,
    NgbModule,
    // ToastrModule,
    ReactiveFormsModule,
    FormsModule,
    FilterPipe,
    ReaderComponent,
    UploadComponent,
    NgSelectModule,
    OnlynumberDirective,
    NgxMaskModule,
    NgxPaginationModule,
    CartComponent,
    PasswordStrengthMeterModule,
    SafePipe,
    ArchwizardModule,
    RangeSliderComponent
  ]
})
export class UtilModule { }
