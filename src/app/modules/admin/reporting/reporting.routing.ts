import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { IndexComponent } from './index/index.component';
import { AssistsComponent } from 'app/modules/admin/reporting/assists/assists.component';
import { InstructorsComponent } from './instructors/instructors.component';
import { TeachersComponent } from './teachers/teachers.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {AuthGuard} from 'app/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: InstructorsComponent
  },
  {
    path: 'asistencia',
    component: AssistsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'instructores',
    component: InstructorsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'docentes',
    component: TeachersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  }

];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
