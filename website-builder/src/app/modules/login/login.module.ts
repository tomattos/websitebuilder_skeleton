import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './containers/login/login.component';
import { MaterialModule } from '../../libs/material/material.module';
import { LoginApi } from './api/login.api';
import { LoginFacade } from './login.facade';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent],
  providers: [LoginApi, LoginFacade],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class LoginModule {}
