import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './instructor.routing';
import { IndexComponent } from './index/index.component';

@NgModule({
  imports: [
    CommonModule,
    routing,
  ],
  declarations: [IndexComponent]
})
export class InstructorModule { }
