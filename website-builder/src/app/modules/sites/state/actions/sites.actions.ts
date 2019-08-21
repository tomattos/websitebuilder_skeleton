import { Action } from '@ngrx/store';
import { Site } from '../../interfaces/site.interface';

export enum SitesActionTypes {
  LoadSites = '[Sites] Load Sites',
  LoadSitesSuccess = '[Sites] Load Sites Success',
  LoadSitesFailure = '[Sites] Load Sites Failure',
  RemoveSite = '[Sites] Remove Site',
  RemoveSiteFailure = '[Sites] Remove Site Failure',
}

// Load Sites Actions
export class LoadSites implements Action {
  readonly type = SitesActionTypes.LoadSites;
}

export class LoadSitesSuccess implements Action {
  readonly type = SitesActionTypes.LoadSitesSuccess;
  constructor(public payload: Site[]) {}
}

export class LoadSitesFailure implements Action {
  readonly type = SitesActionTypes.LoadSitesFailure;
}

// Remove Site Actions
export class RemoveSite implements Action {
  readonly type = SitesActionTypes.RemoveSite;
  constructor(public readonly id: number) {}
}

export class RemoveSiteFailure implements Action {
  readonly type = SitesActionTypes.RemoveSiteFailure;
}

export type SitesActions =
  LoadSites | LoadSitesSuccess | LoadSitesFailure |
  RemoveSite | RemoveSiteFailure;
