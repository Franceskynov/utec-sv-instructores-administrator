import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { routes, routing } from 'app/modules/auth/auth.routing';
import { UtilModule } from 'app/modules/util/util.module';
import { ActivateComponent } from './activate/activate.component';
import { RecoverComponent } from './recover/recover.component';

@NgModule({
  imports: [
    CommonModule,
    routing,
    UtilModule
  ],
  declarations: [
    LoginComponent,
    ActivateComponent,
    RecoverComponent
  ]
})
export class AuthModule { }
