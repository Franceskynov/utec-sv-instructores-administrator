import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { IndexComponent } from './index/index.component';

export const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: []
  },

];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
