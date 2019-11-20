import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { SitesApi } from '../../api/sites.api';
import {
  LoadSites,
  LoadSitesFailure,
  LoadSitesSuccess,
  RemoveSite,
  RemoveSiteFailure,
  SitesActionTypes
} from '../actions/sites.actions';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Site } from '../../interfaces/site.interface';
import { Action } from '@ngrx/store';

@Injectable()
export class SitesEffects {
  constructor(
    private actions$: Actions,
    private readonly sitesApi: SitesApi
  ) {}

  @Effect()
  getAllSites$: Observable<Action> = this.actions$.pipe(
    ofType(SitesActionTypes.LoadSites),
    exhaustMap(() => this.sitesApi.getAllSites()
      .pipe(
        map((res: Site[]) => new LoadSitesSuccess(res)),
        catchError(() => of(new LoadSitesFailure()))
      )
    ));

  @Effect()
  removeSite$: Observable<Action> = this.actions$.pipe(
    ofType(SitesActionTypes.RemoveSite),
    exhaustMap((action: RemoveSite) => this.sitesApi.removeSite(action.id)
      .pipe(
        map(() => new LoadSites()),
        catchError(() => of(new RemoveSiteFailure()))
      )
    ));
}
