import { ComponentSettings } from '../../component-settings.interface';
import { SettingTypes } from '../../single-setting/setting-types';
import { SingleSetting } from '../../single-setting/single-setting.interface';

import { ImageConfig } from '../../single-setting/image-config.interface';
import { ButtonConfig } from '../../single-setting/button-config.interface';

export interface HeaderConfig {
  logo: SingleSetting<SettingTypes.SlideToggleWithScreen, ImageConfig>;
  button: SingleSetting<SettingTypes.SlideToggleWithScreen, ButtonConfig>;
  pin: SingleSetting<SettingTypes.SlideToggle, { isFixed: boolean }>;
  topSpace: SingleSetting<SettingTypes.Range, number>;
  bottomSpace: SingleSetting<SettingTypes.Range, number>;
}

export interface HeaderComponentSettings extends ComponentSettings<HeaderConfig> {}
