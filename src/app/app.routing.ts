import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ModuleWithProviders, Component } from '@angular/core';
import { FixedNavbarFooterLayoutComponent } from 'app/layouts/fixed-navbar-footer-layout/fixed-navbar-footer-layout.component';
import { NotFoundComponent } from 'app/components/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: FixedNavbarFooterLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'reporting',
        pathMatch: 'full'
      },
      {
        path: 'instructores',
        loadChildren: 'app/modules/instructores/instructores.module#InstructoresModule'
      },
      {
        path: 'docentes',
        loadChildren: 'app/modules/docentes/docentes.module#DocentesModule'
      },
      {
        path: 'reporting',
        loadChildren: 'app/modules/reporting/reporting.module#ReportingModule'
      },
      {
        path: 'configuraciones',
        loadChildren: 'app/modules/configuraciones/configuraciones.module#ConfiguracionesModule'
      }
    ]
  },
  {
    path: 'auth',
    loadChildren: 'app/modules/auth/auth.module#AuthModule'
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {});
