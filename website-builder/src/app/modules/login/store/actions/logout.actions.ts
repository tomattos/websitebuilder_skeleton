import { Action } from '@ngrx/store';

export enum LogoutActionTypes {
  LoadLogout = '[Logout] Load Logout',
  LoadLogoutSuccess = '[Logout] Load Logout Success',
}

export class LoadLogout implements Action {
  readonly type = LogoutActionTypes.LoadLogout;
}

export class LoadLogoutSuccess implements Action {
  readonly type = LogoutActionTypes.LoadLogoutSuccess;
}

export type LogoutActions = LoadLogout | LoadLogoutSuccess;

