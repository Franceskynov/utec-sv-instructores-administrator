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
    canActivate: [AuthGuard],
    data: {
      title: 'Materias'
    }
  },
  {
    path: 'ciclo',
    component: CicloComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Ciclo'
    }
  },
  {
    path: 'facultad',
    component: FacultadComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Fcultad'
    }
  },
  {
    path: 'horario',
    component: HorarioComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Horario'
    }
  },
  {
    path: 'aula',
    component: AulaComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Aula'
    }
  }
];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
