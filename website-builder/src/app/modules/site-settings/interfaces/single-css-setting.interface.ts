import { ISingleSetting } from '../../component-settings/interfaces/single-setting/single-setting.interface';
import { SettingTypes } from '../../component-settings/interfaces/single-setting/setting-types';

export interface ISingleCssSetting<T extends SettingTypes, C> extends ISingleSetting<T, C> {
  /*
  * this property is a reference to css variable,
  * responsible for this interface particular property
  * */
  cssClassRef: string;
}
