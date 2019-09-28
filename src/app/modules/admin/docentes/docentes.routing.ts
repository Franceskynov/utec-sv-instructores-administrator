import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { IndexComponent } from 'app/modules/admin/docentes/index/index.component';
import { DirectorioComponent } from './directorio/directorio.component';

export const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'directorio',
    component: DirectorioComponent
  }

];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
