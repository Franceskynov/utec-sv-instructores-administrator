import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { IndexComponent } from './index/index.component';
import { HistorialComponent } from './historial/historial.component';
import { RewardsComponent } from './rewards/rewards.component';
import { InstructoriaComponent } from './instructoria/instructoria.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from 'app/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Dashboard'
        }
      },
      {
        path: 'instructoria',
        component: InstructoriaComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Instructoria'
        }
      },
      {
        path: 'horasSociales',
        component: RewardsComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Horas sociales'
        }
      },
      {
        path: 'historial',
        component: HistorialComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Historial'
        }
      }
    ]
  },

];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
