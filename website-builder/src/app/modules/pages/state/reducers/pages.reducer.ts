import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { createEntityAdapter, Dictionary, EntityAdapter, EntityState } from '@ngrx/entity';
import * as fromPageSettingsActions from '../actions/pages.actions';
import { Page } from '../../interfaces/page.interface';

/* Feature key */
export const pagesSettingsFeatureKey = 'pages';

/* State */
export interface State extends EntityState<Page> {
  currentPageId: string;
}

export const adapter: EntityAdapter<Page> = createEntityAdapter<Page>();

export const initialState: State = adapter.getInitialState({
  currentPageId: null
});

/* Reducer */
const pagesSettingsReducer = createReducer(
  initialState,
  on(fromPageSettingsActions.addPage, (state, { page }) => adapter.addOne(page, state)),
  on(fromPageSettingsActions.changeCurrentPage, (state, { pageId }) => ({ ...state, currentPageId: pageId }))
);

export function reducer(state: State | undefined, action: Action) {
  return pagesSettingsReducer(state, action);
}

/* Selectors */
const selectPagesState = createFeatureSelector<State>(pagesSettingsFeatureKey);

export const {
  selectTotal,
  selectAll,
  selectEntities
} = adapter.getSelectors(selectPagesState);

export const selectCurrentPageId = createSelector(
  selectPagesState,
  (state) => state.currentPageId
);

export const selectCurrentPage = createSelector(
  selectEntities,
  selectCurrentPageId,
  (entities: Dictionary<Page>, currentPageId: string) => entities[currentPageId]
);



