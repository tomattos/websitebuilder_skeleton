import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { createEntityAdapter, Dictionary, EntityAdapter, EntityState } from '@ngrx/entity';
import { ComponentSchema } from '../../interfaces/component-schema.interface';
import * as fromComponentBuilderActions from '../actions/component-builder.actions';

/* Feature key */
export const componentBuilderFeature = 'componentBuilder';

/* State */
export interface State extends EntityState<ComponentSchema> {}
export const adapter: EntityAdapter<ComponentSchema> = createEntityAdapter<ComponentSchema>();
export const initialState: State = adapter.getInitialState();

/* Reducer */
const componentBuilderReducer = createReducer(
  initialState,
  on(fromComponentBuilderActions.addComponent, (state, { component }) => adapter.addOne(component, state)),
  on(fromComponentBuilderActions.removePageComponents, (state, { ids }) => adapter.removeMany(ids, state)),
  on(fromComponentBuilderActions.removeSingleComponent, (state, { id }) => adapter.removeOne(id, state))
);

export function reducer(state = initialState, action: Action): State {
  return componentBuilderReducer(state, action);
}

/* Selectors */
const componentBuilderState = createFeatureSelector<State>(componentBuilderFeature);
export const {
  selectAll,
  selectEntities
} = adapter.getSelectors(componentBuilderState);

export const selectComponentSchemaById = createSelector(
  selectEntities,
  (entities: Dictionary<ComponentSchema>, props: { id: string }) => entities[props.id]
);

export const selectComponentsByPageId = createSelector(
  selectAll,
  (components: ComponentSchema[], props: { pageId }) =>
    components
      .filter((component: ComponentSchema) => component.pageId === props.pageId)
      .map((component: ComponentSchema) => component.id)
);
