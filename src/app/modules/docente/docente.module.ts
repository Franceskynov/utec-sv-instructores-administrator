import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './docente.routing';
import { IndexComponent } from './index/index.component';
import { InstructoriaComponent } from './instructoria/instructoria.component';


@NgModule({
  imports: [
    CommonModule,
    routing,
  ],
  declarations: [
    IndexComponent,
    InstructoriaComponent,
  ]
})
export class DocenteModule { }
