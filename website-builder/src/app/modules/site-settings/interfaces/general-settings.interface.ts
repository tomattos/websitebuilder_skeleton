import { SettingTypes } from '../../component-settings/interfaces/single-setting/setting-types';
import { IGeneralButtonsSettings } from './general-button-settings.interface';
import { IFontFamily, IFontSize } from './style';
import { ISingleCssSetting } from './single-css-setting.interface';
import { ISingleSetting } from '../../component-settings/interfaces/single-setting/single-setting.interface';

export interface IGeneralSettings {
  readonly siteName: ISingleSetting<SettingTypes.Input, { value: string }>;
  readonly siteDescription: ISingleSetting<SettingTypes.Input, { value: string }>;
  readonly connectAnalytics: any;
  readonly primaryColor: ISingleCssSetting<SettingTypes.ColorPicker, { value: string }>;
  readonly secondaryColor: ISingleCssSetting<SettingTypes.ColorPicker, { value: string }>;
  readonly backgroundColor: ISingleCssSetting<SettingTypes.ColorPicker, { value: string }>;
  readonly buttons: IGeneralButtonsSettings;
  readonly titleFontFamily: ISingleCssSetting<SettingTypes.Select, IFontFamily>;
  readonly titleFontSize: ISingleCssSetting<SettingTypes.Input, IFontSize>;
  readonly subtitleFontFamily: ISingleCssSetting<SettingTypes.Select, IFontFamily>;
  readonly subtitleFontSize: ISingleCssSetting<SettingTypes.Input, IFontSize>;
  readonly textFontFamily: ISingleCssSetting<SettingTypes.Select, IFontFamily>;
  readonly textFontSize: ISingleCssSetting<SettingTypes.Input, IFontSize>;
  readonly subtextFontFamily: ISingleCssSetting<SettingTypes.Select, IFontFamily>;
  readonly subtextFontSize: ISingleCssSetting<SettingTypes.Input, IFontSize>;
}
