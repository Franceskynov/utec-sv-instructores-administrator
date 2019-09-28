import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { IndexComponent } from 'app/modules/admin/instructores/index/index.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { PerfilComponent } from './perfil/perfil.component';
import {AuthGuard} from 'app/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'catalogo',
    component: CatalogoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'perfil',
    component: PerfilComponent,
    canActivate: [AuthGuard]
  }

];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
