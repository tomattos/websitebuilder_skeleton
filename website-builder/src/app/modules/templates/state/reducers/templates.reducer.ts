import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Template } from '../../interfaces/template.interface';
import { TemplatesActions, TemplatesActionTypes } from '../actions/templates.actions';
import { Company } from '../../interfaces/company.interface';

export const templatesFeatureKey = 'templates';

export interface TemplateState extends EntityState<Template> {}
export interface CompanyState extends EntityState<Company> {}

export interface State {
  templates: TemplateState;
  companies: CompanyState;
}

export const templateAdapter: EntityAdapter<Template> = createEntityAdapter<Template>();
export const companyAdapter: EntityAdapter<Company> = createEntityAdapter<Company>();

export const initialState: State = {
  templates: templateAdapter.getInitialState(),
  companies: companyAdapter.getInitialState()
};

export const selectTemplatesState = (state: State) => state.templates;
export const selectCompaniesState = (state: State) => state.companies;

export const { selectAll: selectAllTemplates } = templateAdapter.getSelectors(selectTemplatesState);
export const { selectAll: selectAllCompanies } = companyAdapter.getSelectors(selectCompaniesState);

export function reducer(state = initialState, action: TemplatesActions): State {
  switch (action.type) {
    case TemplatesActionTypes.LoadTemplatesSuccess:
      return { ...state, templates: templateAdapter.addAll(action.payload, state.templates) };
    case TemplatesActionTypes.LoadCompaniesSuccess:
      return { ...state, companies: companyAdapter.addAll(action.payload, state.companies) };
    default:
      return state;
  }
}
