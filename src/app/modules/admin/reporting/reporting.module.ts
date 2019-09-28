import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { routes, routing } from 'app/modules/admin/reporting/reporting.routing';
import { AssistsComponent } from 'app/modules/admin/reporting/assists/assists.component';
import { UtilModule } from 'app/modules/util/util.module';
import { IndexComponent } from './index/index.component';
import { InstructorsComponent } from './instructors/instructors.component';
import { TeachersComponent } from './teachers/teachers.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports: [
    UtilModule,
    CommonModule,
    routing
  ],
  declarations: [AssistsComponent, IndexComponent, InstructorsComponent, TeachersComponent, DashboardComponent]
})
export class ReportingModule { }
