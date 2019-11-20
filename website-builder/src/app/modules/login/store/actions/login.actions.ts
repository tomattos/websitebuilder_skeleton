import { Action } from '@ngrx/store';
import { LoginRequest } from '../../interfaces/login-request.interface';

export enum LoginActionTypes {
  LoadLogin = '[Login] Load Login',
  LoadLoginSuccess = '[Login] Load Login Success',
  LoadLoginFailure = '[Login] Load Login Failure',
}

export class LoadLogin implements Action {
  readonly type = LoginActionTypes.LoadLogin;
  constructor(public payload: LoginRequest) {}
}

export class LoadLoginSuccess implements Action {
  readonly type = LoginActionTypes.LoadLoginSuccess;
}

export class LoadLoginFailure implements Action {
  readonly type = LoginActionTypes.LoadLoginFailure;
}

export type LoginActions = LoadLogin | LoadLoginSuccess | LoadLoginFailure;

