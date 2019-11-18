import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { routes, routing } from './instructores.routing';
import { UtilModule } from 'app/modules/util/util.module';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AsignacionComponent } from './asignacion/asignacion.component';
import { InstructoriaComponent } from './instructoria/instructoria.component';
import { HistorialComponent } from './historial/historial.component';
import { BoletinComponent } from './boletin/boletin.component';

@NgModule({
  imports: [
    CommonModule,
    routing,
    UtilModule,
  ],
  declarations: [
    IndexComponent,
    CatalogoComponent,
    PerfilComponent,
    AsignacionComponent,
    InstructoriaComponent,
    HistorialComponent,
    BoletinComponent
  ]
})
export class InstructoresModule { }
