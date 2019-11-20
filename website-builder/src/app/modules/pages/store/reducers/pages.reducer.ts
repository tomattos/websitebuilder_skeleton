import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { createEntityAdapter, Dictionary, EntityAdapter, EntityState } from '@ngrx/entity';
import * as fromPagesActions from '../actions/pages.actions';
import { IPage } from '../../interfaces/page.interface';
import { IPageSettings } from '../../interfaces/page-settings.interface';

/* Feature key */
export const pagesSettingsFeatureKey = 'pages';

/* State */
export interface State extends EntityState<IPage> {
  currentPageId: string;
}

export const adapter: EntityAdapter<IPage> = createEntityAdapter<IPage>();

export const initialState: State = adapter.getInitialState({
  currentPageId: null
});

/* Reducer */
const pagesSettingsReducer = createReducer(
  initialState,
  on(fromPagesActions.addPage, (state, { page }) => adapter.addOne(page, state)),
  on(fromPagesActions.changeCurrentPage, (state, { pageId }) => ({ ...state, currentPageId: pageId })),
  on(fromPagesActions.updatePageSettings, (state, { page }) => adapter.updateOne(page, state)),
  on(fromPagesActions.removePage, (state, { pageId }) => adapter.removeOne(pageId, state))
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
  (state: State) => state.currentPageId
);

export const selectCurrentPage = createSelector(
  selectEntities,
  selectCurrentPageId,
  (entities: Dictionary<IPage>, currentPageId: string) => entities[currentPageId]
);

export const selectCurrentPageSettings = createSelector(
  selectCurrentPage,
  (page: IPage): IPageSettings => page && page.settings
);

export const selectHomePage = createSelector(
  selectAll,
  (pages: IPage[]) => pages.find(page => page.settings.isHome)
);

export const isLastPage = createSelector(
  selectTotal,
  (total: number) => total === 1
);

