import { createAction, props } from '@ngrx/store';
import { ComponentSettings } from '../../interfaces/component-settings.interface';
import { Update } from '@ngrx/entity';

export enum ComponentSettingActionTypes {
  AddComponentSetting = '[ComponentSetting] Add Component Setting',
  UpdateComponentSetting = '[ComponentSetting] Update Component Setting',
  UpdateComponentsSettings = '[ComponentSettings] Update Component Settings',
  UpdateOpenedSlideToggleSetting = '[ComponentSettingsModal] Update Opened Slide Toggle Setting',
  RemoveComponentsSettingsProcess = '[Component Builder Effect] Start Remove Components Settings',
  RemoveComponentsSettings = '[Components Settings Effect] Remove Components Settings',
  RemoveComponentSettingsProcess = '[Component Builder Effect] Start Remove Single Component Settings',
  RemoveComponentSettings = '[Component Settings Effect] Remove Single Component Settings'
}

export const addComponentSettings = createAction(
  ComponentSettingActionTypes.AddComponentSetting,
  props<{ componentSettings: ComponentSettings<any> }>()
);

export const updateComponentSettings = createAction(
  ComponentSettingActionTypes.UpdateComponentSetting,
  props<{ componentSettings: Update<ComponentSettings<any>> }>()
);

export const updateComponentsSettings = createAction(
  ComponentSettingActionTypes.UpdateComponentsSettings,
  props<{ componentsSettings: Update<ComponentSettings<any>>[] }>()
);

export const updateOpenedSlideToggleSetting = createAction(
  ComponentSettingActionTypes.UpdateOpenedSlideToggleSetting,
  props<{ settingName: string }>()
);

export const removeComponentsSettingsProcess = createAction(
  ComponentSettingActionTypes.RemoveComponentsSettingsProcess,
  props<{ ids: string[] }>()
);

export const removeComponentsSettings = createAction(
  ComponentSettingActionTypes.RemoveComponentsSettings,
  props<{ ids: string[] }>()
);

export const removeComponentSettingsProcess = 
