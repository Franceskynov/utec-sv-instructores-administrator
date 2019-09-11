import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { IndexComponent } from 'app/modules/instructores/index/index.component';
import { CatalogoComponent } from './catalogo/catalogo.component';

export const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'catalogo',
    component: CatalogoComponent
  }

];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
