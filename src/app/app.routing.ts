import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ModuleWithProviders, Component } from '@angular/core';
import { FixedNavbarFooterLayoutComponent } from 'app/layouts/fixed-navbar-footer-layout/fixed-navbar-footer-layout.component';
import { NotFoundComponent } from 'app/components/not-found/not-found.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AuthGuard } from 'app/guards/auth.guard';
import { RoleGuard } from 'app/guards/role.guard';
import { CredentialsComponent } from './components/credentials/credentials.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';

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
          title: 'Bienvenid@!!',
          role: ''
        }
      },
      {
        path: 'admin',
        loadChildren: 'app/modules/admin/admin.module#AdminModule',
        canActivate: [RoleGuard],
        data: {
          role: 'Administrador'
        }
      },
      {
        path: 'docente',
        loadChildren: 'app/modules/docente/docente.module#DocenteModule',
        data: {
          role: 'Docente'
        },
        canActivate: [RoleGuard],
      },
      {
        path: 'instructor',
        loadChildren: 'app/modules/instructor/instructor.module#InstructorModule',
        data: {
          role: 'Instructor'
        },
        canActivate: [RoleGuard],
      },
      {
        path: 'credenciales',
        component: CredentialsComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Cambio de credenciales'
        }
      },
    ],
  },
  {
    path: 'login',
    loadChildren: 'app/modules/auth/auth.module#AuthModule'
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
    data: {
      title: 'No tiene autorizacion para ver esta pagina'
    }
  },
  {
    path: '**',
    component: NotFoundComponent,
    data: {
      title: 'El recurso solicitado no existe'
    }
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {});
