import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { IndexComponent } from 'app/modules/admin/configuraciones/index/index.component';
import { MateriasComponent } from 'app/modules/admin/configuraciones/materias/materias.component';
import { CicloComponent } from './ciclo/ciclo.component';
import { FacultadComponent } from './facultad/facultad.component';
import { HorarioComponent } from './horario/horario.component';
import { AulaComponent } from './aula/aula.component';
import { AuthGuard } from 'app/guards/auth.guard';
import { RoleGuard } from 'app/guards/role.guard';
import { EspecialidadesComponent } from './especialidades/especialidades.component';
import { CapacitacionComponent } from './capacitacion/capacitacion.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { PreferenciasComponent } from './preferencias/preferencias.component';
import { EscuelaComponent } from './escuela/escuela.component';
import { EdificioComponent } from './edificio/edificio.component';

export const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'escuelas',
    component: EscuelaComponent,
    data: {
      title: 'Escuelas',
      role: 'Administrador'
    },
    canActivate: [RoleGuard],
  },
  {
    path: 'materias',
    component: MateriasComponent,
    data: {
      title: 'Materias',
      role: 'Administrador'
    },
    canActivate: [RoleGuard],
  },
  {
    path: 'ciclo',
    component: CicloComponent,
    data: {
      title: 'Ciclo',
      role: 'Administrador'
    },
    canActivate: [RoleGuard],
  },
  {
    path: 'facultad',
    component: FacultadComponent,
    data: {
      title: 'Fcultad',
      role: 'Administrador'
    },
    canActivate: [RoleGuard],
  },
  {
    path: 'horario',
    component: HorarioComponent,
    data: {
      title: 'Horario',
      role: 'Administrador'
    },
    canActivate: [RoleGuard],
  },
  {
    path: 'aula',
    component: AulaComponent,
    data: {
      title: 'Aula',
      role: 'Administrador'
    },
    canActivate: [RoleGuard],
  },
  {
    path: 'especialidad',
    component: EspecialidadesComponent,
    data: {
      title: 'Especialidades',
      role: 'Administrador'
    },
    canActivate: [RoleGuard],
  },
  {
    path: 'capacitacion',
    component: CapacitacionComponent,
    data: {
      title: 'Capacitaciones',
      role: 'Administrador'
    },
    canActivate: [RoleGuard],
  },
  {
    path: 'usuarios',
    component: UsuariosComponent,
    data: {
      title: 'Usuarios',
      role: 'Administrador'
    },
    canActivate: [RoleGuard],
  },
  {
    path: 'preferencias',
    component: PreferenciasComponent,
    data: {
      title: 'Preferencias del sistema',
      role: 'Administrador'
    },
    canActivate: [RoleGuard],
  },
  {
    path: 'edificio',
    component: EdificioComponent,
    data: {
      title: 'Edificios',
      role: 'Administrador'
    },
    canActivate: [RoleGuard],
  },
];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
