import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { IndexComponent } from 'app/modules/admin/instructores/index/index.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AsignacionComponent } from './asignacion/asignacion.component';
import { InstructoriaComponent } from './instructoria/instructoria.component';
import { AuthGuard } from 'app/guards/auth.guard';
import { HistorialComponent } from './historial/historial.component';
import { BoletinComponent } from './boletin/boletin.component';

export const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'catalogo',
    component: CatalogoComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Catalogo de Instructores'
    }
  },
  {
    path: 'perfil/:id',
    component: PerfilComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Perfil del instructor'
    }
  },
  {
    path: 'asignacion',
    component: AsignacionComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Asignacion de estudiantes'
    }
  },
  {
    path: 'instructoria',
    component: InstructoriaComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Instructorias asignadas'
    }
  },
  {
    path: 'historial',
    component: HistorialComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Historial de asistencia'
    }
  },
  {
    path: 'boletin',
    component: BoletinComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Boletin'
    }
  }

];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
