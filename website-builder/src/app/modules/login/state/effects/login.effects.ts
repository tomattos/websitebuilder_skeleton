import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { LoadLogin, LoadLoginFailure, LoadLoginSuccess, LoginActionTypes } from '../actions/login.actions';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { LoginApi } from '../../api/login.api';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { LoadLogout, LoadLogoutSuccess, LogoutActionTypes } from '../actions/logout.actions';

@Injectable()
export class LoginEffects {
  constructor(
    private actions$: Actions,
    private readonly router: Router,
    private readonly loginApi: LoginApi
  ) {}

  @Effect()
  login$: Observable<Action> = this.actions$.pipe(
    ofType(LoginActionTypes.LoadLogin),
    exhaustMap((action: LoadLogin) => this.loginApi.login(action.payload)
      .pipe(
        map(() => {
          this.router.navigateByUrl('/sites');
          return new LoadLoginSuccess();
        }),
        catchError(() => of(new LoadLoginFailure()))
      ))
  );

  @Effect()
  logout$: Observable<Action> = this.actions$.pipe(
    ofType(LogoutActionTypes.LoadLogout),
    exhaustMap(() => this.loginApi.logout()
      .pipe(
        map(() => {
          this.router.navigateByUrl('/login');
          return new LoadLogoutSuccess();
        })
      ))
  );
}
