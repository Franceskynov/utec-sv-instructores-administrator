import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { routes, routing } from 'app/modules/auth/auth.routing';
import { UtilModule } from 'app/modules/util/util.module';

@NgModule({
  imports: [
    CommonModule,
    routing,
    UtilModule
  ],
  declarations: [LoginComponent]
})
export class AuthModule { }
