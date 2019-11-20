import { IAlignItems, IBorderRadius, IFontSize, IFontStyle, IFontWeight } from './style';
import { ISingleSetting } from '../../component-settings/interfaces/single-setting/single-setting.interface';
import { SettingTypes } from '../../component-settings/interfaces/single-setting/setting-types';
import { ISingleCssSetting } from './single-css-setting.interface';

export enum EmButtonVariant {
  Primary = 'Primary',
  Secondary = 'Secondary',
  Link = 'Link'
}

export interface ISingleButtonSetting {
  fontSize: ISingleCssSetting<SettingTypes.Input, IFontSize>;
  fontWeight: ISingleCssSetting<SettingTypes.IconButton, IFontWeight>;
  fontStyle: ISingleCssSetting<SettingTypes.IconButton, IFontStyle>;
  alignItems: ISingleCssSetting<SettingTypes.IconButton, IAlignItems>;
  rounded: ISingleCssSetting<SettingTypes.Range, IBorderRadius>;
  shadow: ISingleSetting<SettingTypes.SlideToggle, { isVisible: boolean }>;
  /* Todo: add one more field to interface related to  */
}

export interface IGeneralButtonsSettings {
  primary: ISingleButtonSetting;
  secondary: ISingleButtonSetting;
}
