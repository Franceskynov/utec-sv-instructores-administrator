import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './admin.routing';
import { IndexComponent } from './index/index.component';

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [IndexComponent]
})
export class AdminModule { }
