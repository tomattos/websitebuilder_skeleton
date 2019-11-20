import { SettingTypes } from '../single-setting/setting-types';
import { EventEmitter } from '@angular/core';

export interface ISelect {
  /* by settingType component will be expect settings only for this type */
  readonly settingType: SettingTypes.Select;
  readonly options: any[];
  readonly value: any;
  updateSelectedValueEvent: EventEmitter<any>;
  onUpdateSelectValue: (event) => void;
}
