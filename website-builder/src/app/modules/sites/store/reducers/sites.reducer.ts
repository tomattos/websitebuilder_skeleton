import { createFeatureSelector } from '@ngrx/store';
import { Site } from '../../interfaces/site.interface';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { SitesActions, SitesActionTypes } from '../actions/sites.actions';

export const sitesFeatureKey = 'sites';

export interface State extends EntityState<Site> {}

export const adapter: EntityAdapter<Site> = createEntityAdapter<Site>();

export const initialState: State = adapter.getInitialState();

// Selectors
export const getSitesState = createFeatureSelector<State>('sites');

export const {
  selectAll
} = adapter.getSelectors(getSitesState);

export function reducer(state = initialState, action: SitesActions): State {
  switch (action.type) {
    case SitesActionTypes.LoadSitesSuccess:
      return adapter.addAll(action.payload, state);
    default:
      return state;
  }
}
