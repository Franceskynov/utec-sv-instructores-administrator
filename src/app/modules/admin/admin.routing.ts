import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { IndexComponent } from './index/index.component';

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
        loadChildren: 'app/modules/admin/instructores/instructores.module#InstructoresModule'
      },
      {
        path: 'docentes',
        loadChildren: 'app/modules/admin/docentes/docentes.module#DocentesModule'
      },
      {
        path: 'reporting',
        loadChildren: 'app/modules/admin/reporting/reporting.module#ReportingModule'
      },
      {
        path: 'configuraciones',
        loadChildren: 'app/modules/admin/configuraciones/configuraciones.module#ConfiguracionesModule'
      },
    ]
  },

];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
