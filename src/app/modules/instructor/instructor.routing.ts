import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { IndexComponent } from './index/index.component';
import { HistorialComponent } from './historial/historial.component';
import { RewardsComponent } from './rewards/rewards.component';
import { InstructoriaComponent } from './instructoria/instructoria.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from 'app/guards/auth.guard';
import { RoleGuard } from 'app/guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: {
          title: 'Dashboard',
          role: 'Instructor'
        }
      },
      {
        path: 'instructoria',
        component: InstructoriaComponent,
        data: {
          title: 'Instructoria',
          role: 'Instructor'
        },
        canActivate: [RoleGuard],
      },
      {
        path: 'horasSociales',
        component: RewardsComponent,
        data: {
          title: 'Horas sociales',
          role: 'Instructor'
        },
        canActivate: [RoleGuard],
      },
      {
        path: 'historial',
        component: HistorialComponent,
        data: {
          title: 'Historial',
          role: 'Instructor'
        },
        canActivate: [RoleGuard],
      }
    ]
  },

];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
