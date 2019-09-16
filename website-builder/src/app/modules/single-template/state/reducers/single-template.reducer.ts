import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as fromSingleTemplateActions from '../actions/single-template.actions';
import { Observer } from 'rxjs';

/* Feature key */
export const singleTemplateFeatureKey = 'singleTemplate';

/* State */
export interface State {
  targetComponentSeq: number;
}

export const initialState: State = {
  targetComponentSeq: null
};

/* Reducer */
const singleTemplateReducer = createReducer(
  initialState,
  on(fromSingleTemplateActions.setTargetComponentSeq, (state, props) => ({ ...state, targetComponentSeq: props.targetComponentSeq }))
);

export function reducer(state: State | undefined, action: Action) {
  return singleTemplateReducer(state, action);
}

/* Selectors */
const selectSingleTemplateState = createFeatureSelector<State>(singleTemplateFeatureKey);

export const selectTargetComponentSeq = createSelector(
  selectSingleTemplateState,
  (state) => typeof state.targetComponentSeq === 'number' ? state.targetComponentSeq : null
);
