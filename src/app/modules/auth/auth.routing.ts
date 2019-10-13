import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { LoginComponent } from 'app/modules/auth/login/login.component';
import { ActivateComponent } from './activate/activate.component';
import { RecoverComponent } from './recover/recover.component';

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
    },
    {
      path: 'accountRecover',
      component: RecoverComponent,
      data: {
        title: 'Recuperacion de cuenta'
      }
    }

];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
