import { SettingTypes } from './setting-types';

export interface SingleSetting<T extends SettingTypes, C> {
  type: T;
  config: C;
}
