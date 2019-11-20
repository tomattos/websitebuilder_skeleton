import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCompaniesState from './companies.reducer';
import * as fromTemplatesState from './templates.reducer';

export const templatesFeatureKey = 'templates';

export interface State {
  templates: fromTemplatesState.State;
  companies: fromCompaniesState.State;
}

export const reducers: ActionReducerMap<State> = {
  templates: fromTemplatesState.reducer,
  companies: fromCompaniesState.reducer
};

export const selectState = createFeatureSelector<State>('templates');

export const selectCompaniesState = createSelector(selectState, fromCompaniesState.selectCompaniesState);
export const selectAllCompanies = createSelector(selectCompaniesState, fromCompaniesState.selectAllCompanies);
