import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { routes, routing } from './instructores.routing';
import { UtilModule } from 'app/modules/util/util.module';
import { CatalogoComponent } from './catalogo/catalogo.component';

@NgModule({
  imports: [
    CommonModule,
    routing,
    UtilModule,
  ],
  declarations: [IndexComponent, CatalogoComponent]
})
export class InstructoresModule { }
