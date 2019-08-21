import { Action } from '@ngrx/store';
import { LoginActionTypes } from '../actions/login.actions';
import { LogoutActionTypes } from '../actions/logout.actions';

export const loginFeatureKey = 'login';

export interface State {
  loggedIn: boolean;
}

export const initialState: State = {
  loggedIn: false
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case LoginActionTypes.LoadLoginSuccess:
      return { ...state, loggedIn: true };
    case LoginActionTypes.LoadLoginFailure:
      return { ...state, loggedIn: false };
    case LogoutActionTypes.LoadLogoutSuccess:
      return { ...state, loggedIn: false };
    default:
      return state;
  }
}
