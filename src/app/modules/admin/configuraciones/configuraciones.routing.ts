import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { IndexComponent } from 'app/modules/admin/configuraciones/index/index.component';
import { MateriasComponent } from 'app/modules/admin/configuraciones/materias/materias.component';
import { CicloComponent } from './ciclo/ciclo.component';
import { FacultadComponent } from './facultad/facultad.component';
import { HorarioComponent } from './horario/horario.component';
import { AulaComponent } from './aula/aula.component';
import {AuthGuard} from 'app/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'materias',
    component: MateriasComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'ciclo',
    component: CicloComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'facultad',
    component: FacultadComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'horario',
    component: HorarioComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'aula',
    component: AulaComponent,
    canActivate: [AuthGuard]
  }
];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
