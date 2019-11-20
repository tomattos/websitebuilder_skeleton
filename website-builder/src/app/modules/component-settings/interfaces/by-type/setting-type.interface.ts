import { SettingTypes } from '../single-setting/setting-types';

export interface ISettingType<T extends SettingTypes> {
  readonly settingType: T;
}
