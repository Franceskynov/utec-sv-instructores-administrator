import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { IndexComponent } from 'app/modules/admin/configuraciones/index/index.component';
import { MateriasComponent } from 'app/modules/admin/configuraciones/materias/materias.component';
import { CicloComponent } from './ciclo/ciclo.component';
import { FacultadComponent } from './facultad/facultad.component';
import { HorarioComponent } from './horario/horario.component';
import { AulaComponent } from './aula/aula.component';

export const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'materias',
    component: MateriasComponent
  },
  {
    path: 'ciclo',
    component: CicloComponent
  },
  {
    path: 'facultad',
    component: FacultadComponent
  },
  {
    path: 'horario',
    component: HorarioComponent
  },
  {
    path: 'aula',
    component: AulaComponent
  }
];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
