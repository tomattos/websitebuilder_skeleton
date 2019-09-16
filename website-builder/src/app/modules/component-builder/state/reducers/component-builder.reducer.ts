import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { createEntityAdapter, Dictionary, EntityAdapter, EntityState } from '@ngrx/entity';
import { ComponentSchema } from '../../interfaces/component-schema.interface';
import * as TemplateActions from '../actions/component-builder.actions';
import { ComponentSettings } from '../../../component-settings/interfaces/component-settings.interface';

/* Feature key */
export const componentBuilderFeature = 'componentBuilder';

/* State */
export interface State extends EntityState<ComponentSchema> {}

export const adapter: EntityAdapter<ComponentSchema> = createEntityAdapter<ComponentSchema>();

export const initialState: State = adapter.getInitialState();

/* Reducer */
const componentBuilderReducer = createReducer(
  initialState,
  on(TemplateActions.addComponent, (state, { component }) => adapter.addOne(component, state))
);

export function reducer(state = initialState, action: Action): State {
  return componentBuilderReducer(state, action);
}

/* Selectors */
const componentBuilderState = createFeatureSelector<State>(componentBuilderFeature);
export const {
  selectAll,
  selectTotal,
  selectEntities
} = adapter.getSelectors(componentBuilderState);

export const selectComponentSchemaById =
  createSelector(selectEntities, (entities: Dictionary<ComponentSchema>, props: { id: string }) => entities[props.id]);
