import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { IndexComponent } from './index/index.component';
import {AuthGuard} from 'app/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      { path: '',
        redirectTo: 'reporting/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'instructores',
        loadChildren: 'app/modules/admin/instructores/instructores.module#InstructoresModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'docentes',
        loadChildren: 'app/modules/admin/docentes/docentes.module#DocentesModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'reporting',
        loadChildren: 'app/modules/admin/reporting/reporting.module#ReportingModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'configuraciones',
        loadChildren: 'app/modules/admin/configuraciones/configuraciones.module#ConfiguracionesModule',
        canActivate: [AuthGuard]
      },
    ]
  },

];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
