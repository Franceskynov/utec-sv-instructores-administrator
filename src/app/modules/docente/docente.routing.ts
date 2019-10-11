import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { IndexComponent } from './index/index.component';
import { InstructoriaComponent } from './instructoria/instructoria.component';

export const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: 'instructoria',
        component: InstructoriaComponent,
        data: {
          title: 'Instructoria'
        }
      }
    ]
  },

];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
