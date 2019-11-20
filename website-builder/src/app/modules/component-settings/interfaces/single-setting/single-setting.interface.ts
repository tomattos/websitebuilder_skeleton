import { SettingTypes } from './setting-types';

/* ST generic option for SlideToggleInnerSettingType */
export interface ISingleSetting<T extends SettingTypes, C, ST = null> {
  type: T;
  config: C;
  slideToggleInnerSettingType?: ST | string;
}
