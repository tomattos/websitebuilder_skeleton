import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoadLogout } from '../login/store/actions/logout.actions';
import { LoadSites, RemoveSite } from './store/actions/sites.actions';

@Injectable()
export class SitesFacade {
  constructor(private readonly store: Store<{ loggedIn: boolean }>) {}

  logout() {
    this.store.dispatch(new LoadLogout());
  }

  getAllSites() {
    this.store.dispatch(new LoadSites());
  }

  removeSite(id: number) {
    this.store.dispatch(new RemoveSite(id));
  }
}
