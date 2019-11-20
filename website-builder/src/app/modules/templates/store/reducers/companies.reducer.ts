import { Action, createFeatureSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Company } from '../../interfaces/company.interface';
import { CompaniesActions, CompaniesActionTypes } from '../actions/companies.action';


export const companiesFeatureKey = 'companies';

export interface State extends EntityState<Company> {}

export const adapter: EntityAdapter<Company> = createEntityAdapter<Company>();

export const initialState: State = adapter.getInitialState();

export const selectCompaniesState = createFeatureSelector<State>('companies');

export const { selectAll: selectAllCompanies } = adapter.getSelectors();

export function reducer(state = initialState, action: CompaniesActions): State {
  switch (action.type) {
    case CompaniesActionTypes.LoadCompaniesSuccess:
      return adapter.addAll(action.payload, state);
    default:
      return state;
  }
}
