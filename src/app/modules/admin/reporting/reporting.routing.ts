import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { IndexComponent } from './index/index.component';
import { AssistsComponent } from 'app/modules/admin/reporting/assists/assists.component';
import { InstructorsComponent } from './instructors/instructors.component';
import { TeachersComponent } from './teachers/teachers.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {AuthGuard} from 'app/guards/auth.guard';
import { HistoryComponent } from './history/history.component';

export const routes: Routes = [
  {
    path: '',
    component: InstructorsComponent
  },
  {
    path: 'asistencia',
    component: AssistsComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Reporte de asistencia'
    }
  },
  {
    path: 'instructores',
    component: InstructorsComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Reporte de Instructores'
    }
  },
  {
    path: 'docentes',
    component: TeachersComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Reporte de Docentes'
    }
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Dashboard'
    }
  },
  {
    path: 'notas',
    component: HistoryComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Notas'
    }
  }

];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
