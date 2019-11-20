import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromGeneralSettingSubStore from './general-setting.reducer';

export const siteSettingsFeatureKey = 'siteSettings';

export interface State {
  generalSettings: fromGeneralSettingSubStore.State;
}

export const reducer: ActionReducerMap<State> = {
  generalSettings: fromGeneralSettingSubStore.reducer,
};

/* Selectors */
export const siteSettingsState =
  createFeatureSelector<State>(siteSettingsFeatureKey);

export const selectGeneralSettings = createSelector(
  siteSettingsState,
  (state: State)  => state.generalSettings
);
