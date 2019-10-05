import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ModuleWithProviders, Component } from '@angular/core';
import { FixedNavbarFooterLayoutComponent } from 'app/layouts/fixed-navbar-footer-layout/fixed-navbar-footer-layout.component';
import { NotFoundComponent } from 'app/components/not-found/not-found.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthGuard } from 'app/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: FixedNavbarFooterLayoutComponent,
    children: [
      {
        path: '',
        component: WelcomeComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Bienvenid@!!'
        }
      },
      {
        path: 'admin',
        loadChildren: 'app/modules/admin/admin.module#AdminModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'docente',
        loadChildren: 'app/modules/docente/docente.module#DocenteModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'instructor',
        loadChildren: 'app/modules/instructor/instructor.module#InstructorModule',
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'login',
    loadChildren: 'app/modules/auth/auth.module#AuthModule'
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {});
