import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { routes, routing } from 'app/modules/reporting/reporting.routing';
import { AssistsComponent } from 'app/modules/reporting/assists/assists.component';
import { UtilModule } from 'app/modules/util/util.module';
import { IndexComponent } from './index/index.component';

@NgModule({
  imports: [
    UtilModule,
    CommonModule,
    routing
  ],
  declarations: [AssistsComponent, IndexComponent]
})
export class ReportingModule { }
