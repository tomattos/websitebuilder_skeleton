import { createAction, props } from '@ngrx/store';
import { IGeneralSettings } from '../../interfaces/general-settings.interface';

export enum GeneralSettingsActionTypes {
  UpdateGeneralSettings = '[SiteSettingsModal] Update General Settings'
}

export const updateGeneralSettings = createAction(
  GeneralSettingsActionTypes.UpdateGeneralSettings,
  props<{ newSettings: IGeneralSettings }>()
);




