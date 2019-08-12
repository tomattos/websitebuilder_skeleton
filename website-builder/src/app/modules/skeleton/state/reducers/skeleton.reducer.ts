import { Action, createReducer, on } from '@ngrx/store';


export const skeletonFeatureKey = 'skeleton';

export interface State {

}

export const initialState: State = {

};

const skeletonReducer = createReducer(
  initialState,

);

export function reducer(state: State | undefined, action: Action) {
  return skeletonReducer(state, action);
}
