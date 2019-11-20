import { EventEmitter } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material';
import { SettingTypes } from '../single-setting/setting-types';

export interface ISlideToggleWithScreen {
  /* by settingType component will be expect settings only for this type */
  readonly settingType: SettingTypes.SlideToggleWithScreen;
  readonly name: string;
  readonly isVisible: boolean;
  updateVisibilitySettingEvent: EventEmitter<boolean>;
  onUpdateVisibilitySetting(event: MatSlideToggleChange): void;
}
