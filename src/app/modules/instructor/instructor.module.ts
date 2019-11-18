import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './instructor.routing';
import { IndexComponent } from './index/index.component';
import { HistorialComponent } from './historial/historial.component';
import { RewardsComponent } from './rewards/rewards.component';
import { InstructoriaComponent } from './instructoria/instructoria.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UtilModule } from 'app/modules/util/util.module';

@NgModule({
  imports: [
    CommonModule,
    routing,
    UtilModule,
  ],
  declarations: [
    IndexComponent,
    HistorialComponent,
    RewardsComponent,
    InstructoriaComponent,
    DashboardComponent
  ]
})
export class InstructorModule { }
