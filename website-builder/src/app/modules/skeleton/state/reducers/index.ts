import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../../../environments/environment';
import * as fromSkeleton from './skeleton.reducer';

export interface State {

  [fromSkeleton.skeletonFeatureKey]: fromSkeleton.State;
}

export const reducers: ActionReducerMap<State> = {

  [fromSkeleton.skeletonFeatureKey]: fromSkeleton.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
