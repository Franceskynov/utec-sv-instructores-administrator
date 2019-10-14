import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { IndexComponent } from './index/index.component';
import { InstructoriaComponent } from './instructoria/instructoria.component';
import { RoleGuard } from 'app/guards/role.guard';
import { AuthGuard } from 'app/guards/auth.guard';

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
      }
    ]
  },

];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
