import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { IndexComponent } from './index/index.component';
import { AssistsComponent } from 'app/modules/admin/reporting/assists/assists.component';
import { InstructorsComponent } from './instructors/instructors.component';
import { TeachersComponent } from './teachers/teachers.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: InstructorsComponent
  },
  {
    path: 'asistencia',
    component: AssistsComponent
  },
  {
    path: 'instructores',
    component: InstructorsComponent
  },
  {
    path: 'docentes',
    component: TeachersComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  }

];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
