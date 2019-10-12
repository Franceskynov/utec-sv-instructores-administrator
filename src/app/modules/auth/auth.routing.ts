import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { LoginComponent } from 'app/modules/auth/login/login.component';
import { ActivateComponent } from './activate/activate.component';

export const routes: Routes = [
    {
      path: '',
      component: LoginComponent,
      data: {
        title: 'Login'
      }
    },
    {
      path: 'activate',
      component: ActivateComponent,
      data: {
        title: 'Activar cuenta de usuario'
      }
    }

];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
