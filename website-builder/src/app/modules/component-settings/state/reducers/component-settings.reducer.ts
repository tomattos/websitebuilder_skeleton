import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { createEntityAdapter, Dictionary, EntityAdapter, EntityState } from '@ngrx/entity';
import { ComponentSettings } from '../../interfaces/component-settings.interface';
import * as ComponentSettingsActions from '../actions/component-setting.actions';

export const componentSettingFeatureKey = 'componentSetting';

export interface State extends EntityState<ComponentSettings<any>> {}

export const adapter: EntityAdapter<ComponentSettings<any>> = createEntityAdapter<ComponentSettings<any>>();

export const initialState: State = adapter.getInitialState();

const componentSettingsReducer = createReducer(
  initialState,
  on(ComponentSettingsActions.addComponentSettings, (state, { componentSettings }) => adapter.addOne(componentSettings, state)),
  on(ComponentSettingsActions.updateComponentSettings, (state, { componentSettings }) => adapter.updateOne(componentSettings, state)),
  on(ComponentSettingsActions.updateComponentsSettings, (state, { componentsSettings }) => adapter.updateMany(componentsSettings, state))
);

export function reducer(state = initialState, action: Action): State {
  return componentSettingsReducer(state, action);
}

const componentSettingsState = createFeatureSelector<State>('componentSettings');

export const {
  selectEntities,
  selectAll
} = adapter.getSelectors(componentSettingsState);

export const selectSettingById =
  createSelector(selectEntities, (entities: Dictionary<ComponentSettings<any>>, props: { id: string }) => entities[props.id]);
