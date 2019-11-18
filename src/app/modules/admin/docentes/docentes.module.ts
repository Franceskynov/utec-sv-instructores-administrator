import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { routes, routing } from './docentes.routing';
import { UtilModule } from 'app/modules/util/util.module';
import { DirectorioComponent } from './directorio/directorio.component';
import { PerfilComponent } from './perfil/perfil.component';

@NgModule({
  imports: [
    CommonModule,
    routing,
    UtilModule,
  ],
  declarations: [IndexComponent, DirectorioComponent, PerfilComponent]
})
export class DocentesModule { }
