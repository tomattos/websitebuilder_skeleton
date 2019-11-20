import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoginRequest } from './interfaces/login-request.interface';
import { LoadLogin } from './store/actions/login.actions';

@Injectable()
export class LoginFacade {
  constructor(private readonly store: Store<{ loggedIn: boolean }>) {}

  login(payload: LoginRequest) {
    this.store.dispatch(new LoadLogin(payload));
  }
}
