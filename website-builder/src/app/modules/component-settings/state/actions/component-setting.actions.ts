import { Action } from '@ngrx/store';

export enum ComponentSettingActionTypes {
  LoadComponentSettings = '[ComponentSetting] Load ComponentSettings',
  LoadComponentSettingsSuccess = '[ComponentSetting] Load ComponentSettings Success',
  LoadComponentSettingsFailure = '[ComponentSetting] Load ComponentSettings Failure',
}

export class LoadComponentSettings implements Action {
  readonly type = ComponentSettingActionTypes.LoadComponentSettings;
}

export class LoadComponentSettingsSuccess implements Action {
  readonly type = ComponentSettingActionTypes.LoadComponentSettingsSuccess;
  constructor(public payload: { data: any }) { }
}

export class LoadComponentSettingsFailure implements Action {
  readonly type = ComponentSettingActionTypes.LoadComponentSettingsFailure;
  constructor(public payload: { error: any }) { }
}

export type ComponentSettingActions = LoadComponentSettings | LoadComponentSettingsSuccess | LoadComponentSettingsFailure;

