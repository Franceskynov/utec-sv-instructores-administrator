import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { IndexComponent } from 'app/modules/instructores/index/index.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { PerfilComponent } from './perfil/perfil.component';

export const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'catalogo',
    component: CatalogoComponent
  },
  {
    path: 'perfil',
    component: PerfilComponent
  }

];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
