import { createAction, props } from '@ngrx/store';
import { ComponentSettings } from '../../interfaces/component-settings.interface';
import { Update } from '@ngrx/entity';

export enum ComponentSettingActionTypes {
  AddComponentSetting = '[ComponentSetting] Add Component Setting',
  UpdateComponentSetting = '[ComponentSetting] Update Component Setting',
  UpdateComponentsSettings = '[ComponentSettings] Update Component Settings'
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

