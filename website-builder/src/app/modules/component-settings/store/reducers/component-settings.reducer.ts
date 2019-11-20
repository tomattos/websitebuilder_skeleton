import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { createEntityAdapter, Dictionary, EntityAdapter, EntityState } from '@ngrx/entity';
import { ComponentSettings } from '../../interfaces/component-settings.interface';
import * as ComponentSettingsActions from '../actions/component-setting.actions';
import { SlideToggleInnerSettingType } from '../../interfaces/slide-toggle-inner-setting.enum';

export const componentSettingFeatureKey = 'componentSetting';

export interface State extends EntityState<ComponentSettings<any>> {
  openedSlideToggleSetting: string;
}

export const adapter: EntityAdapter<ComponentSettings<any>> = createEntityAdapter<ComponentSettings<any>>();

export const initialState: State = adapter.getInitialState({
  openedSlideToggleSetting: null
});

const componentSettingsReducer = createReducer(
  initialState,
  on(ComponentSettingsActions.addComponentSettings, (state, { componentSettings }) => adapter.addOne(componentSettings, state)),
  on(ComponentSettingsActions.updateComponentSettings, (state, { componentSettings }) => adapter.updateOne(componentSettings, state)),
  on(ComponentSettingsActions.updateComponentsSettings, (state, { componentsSettings }) => adapter.updateMany(componentsSettings, state)),
  on(ComponentSettingsActions.updateOpenedSlideToggleSetting, (state, { settingName }) =>
    ({ ...state, openedSlideToggleSetting: settingName })
  ),
  on(ComponentSettingsActions.removeComponentsSettings, (state, { ids }) => adapter.removeMany(ids, state))
);

export function reducer(state = initialState, action: Action): State {
  return componentSettingsReducer(state, action);
}

const componentSettingsState = createFeatureSelector<State>('componentSettings');

export const {
  selectEntities,
  selectAll
} = adapter.getSelectors(componentSettingsState);

export const selectSettingById = createSelector(
  selectEntities,
  (entities: Dictionary<ComponentSettings<any>>, props: { id: string }): ComponentSettings<any> => entities[props.id]
);

export const selectOpenedSlideToggleSetting = createSelector(
  componentSettingsState,
  state => state.openedSlideToggleSetting as SlideToggleInnerSettingType
);

export const selectSeq = createSelector(
  selectSettingById,
  (settings: ComponentSettings<any>): number => settings.seq
);
