import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { LoginComponent } from 'app/modules/auth/login/login.component';

export const routes: Routes = [
    {
      path: '',
      component: LoginComponent,
      data: {
        title: 'Login'
      }
    }

];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
