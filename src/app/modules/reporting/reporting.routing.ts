import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { AssistsComponent } from 'app/modules/reporting/assists/assists.component';


export const routes: Routes = [
    { path: 'assistence', component: AssistsComponent }

];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
