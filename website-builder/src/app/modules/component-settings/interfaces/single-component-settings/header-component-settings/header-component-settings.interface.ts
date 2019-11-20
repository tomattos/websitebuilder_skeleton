import { ComponentSettings } from '../../component-settings.interface';
import { SettingTypes } from '../../single-setting/setting-types';
import { ISingleSetting } from '../../single-setting/single-setting.interface';

import { ImageConfig } from '../../single-setting/image-config.interface';
import { ButtonConfig } from '../../single-setting/button-config.interface';
import { SlideToggleInnerSettingType } from '../../slide-toggle-inner-setting.enum';

export interface HeaderConfig {
  logo: ISingleSetting<SettingTypes.SlideToggleWithScreen, ImageConfig, SlideToggleInnerSettingType.Logo>;
  button: ISingleSetting<SettingTypes.SlideToggleWithScreen, ButtonConfig, SlideToggleInnerSettingType.Button>;
  pin: ISingleSetting<SettingTypes.SlideToggle, { isFixed: boolean }>;
  topSpace: ISingleSetting<SettingTypes.Range, number>;
  bottomSpace: ISingleSetting<SettingTypes.Range, number>;
}

export interface HeaderComponentSettings extends ComponentSettings<HeaderConfig> {}
