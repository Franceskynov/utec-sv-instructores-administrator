import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { IndexComponent } from 'app/modules/admin/docentes/index/index.component';
import { DirectorioComponent } from './directorio/directorio.component';
import {AuthGuard} from 'app/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'directorio',
    component: DirectorioComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Directorio de docentes'
    }
  }

];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
