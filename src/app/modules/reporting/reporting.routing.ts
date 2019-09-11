import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { IndexComponent } from './index/index.component';
import { AssistsComponent } from 'app/modules/reporting/assists/assists.component';
import { InstructorsComponent } from './instructors/instructors.component';
import { TeachersComponent } from './teachers/teachers.component';

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
  }

];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
