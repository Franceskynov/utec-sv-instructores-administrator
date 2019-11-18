import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './docente.routing';
import { IndexComponent } from './index/index.component';
import { InstructoriaComponent } from './instructoria/instructoria.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MateriasComponent } from './materias/materias.component';
import { UtilModule } from 'app/modules/util/util.module';
import { PerfilComponent } from './instructor/perfil/perfil.component';

@NgModule({
  imports: [
    CommonModule,
    routing,
    UtilModule
  ],
  declarations: [
    IndexComponent,
    InstructoriaComponent,
    DashboardComponent,
    MateriasComponent,
    PerfilComponent,
  ]
})
export class DocenteModule { }
