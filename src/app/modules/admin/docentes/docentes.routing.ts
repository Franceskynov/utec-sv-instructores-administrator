import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { IndexComponent } from 'app/modules/admin/docentes/index/index.component';
import { DirectorioComponent } from './directorio/directorio.component';
import { AuthGuard } from 'app/guards/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';

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
  },
  {
    path: 'perfil/:id',
    component: PerfilComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Perfil de docentes'
    }
  }

];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
