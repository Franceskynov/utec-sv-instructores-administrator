import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { IndexComponent } from './index/index.component';
import { InstructoriaComponent } from './instructoria/instructoria.component';
import { RoleGuard } from 'app/guards/role.guard';
import { AuthGuard } from 'app/guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MateriasComponent } from './materias/materias.component';
import { PerfilComponent } from './instructor/perfil/perfil.component';

export const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'instructoria',
        component: InstructoriaComponent,
        data: {
          title: 'Instructoria',
          role: 'Docente'
        },
        canActivate: [RoleGuard]
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: {
          title: 'Dashboard',
          role: 'Docente'
        },
        canActivate: [RoleGuard]
      },
      {
        path: 'materias',
        component: MateriasComponent,
        data: {
          title: 'Materias',
          role: 'Docente'
        },
        canActivate: [RoleGuard]
      },
      {
        path: 'perfil/instructor/:id',
        component: PerfilComponent,
        data: {
          title: 'Perfil del instructor',
          role: 'Docente'
        },
        canActivate: [RoleGuard]
      }
    ]
  },

];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
