import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Template } from '../../interfaces/template.interface';
import { TemplatesActions, TemplatesActionTypes } from '../actions/templates.actions';
import { createFeatureSelector } from '@ngrx/store';

export interface State extends EntityState<Template> {}

export const adapter: EntityAdapter<Template> = createEntityAdapter<Template>();

export const initialState: State = adapter.getInitialState();

export const getTemplatesState = createFeatureSelector<State>('templates');

export const { selectAll } = adapter.getSelectors(getTemplatesState);

export function reducer(state: State = initialState, action: TemplatesActions): State {
  switch (action.type) {
    case TemplatesActionTypes.LoadTemplatesSuccess:
      return adapter.addAll(action.payload, state);
    default:
      return state;
  }
}
