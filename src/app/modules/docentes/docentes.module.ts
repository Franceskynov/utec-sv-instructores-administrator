import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { routes, routing } from './docentes.routing';
import { UtilModule } from 'app/modules/util/util.module';
import { DirectorioComponent } from './directorio/directorio.component';

@NgModule({
  imports: [
    CommonModule,
    routing,
    UtilModule,
  ],
  declarations: [IndexComponent, DirectorioComponent]
})
export class DocentesModule { }
