import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material';
import { SlideToggleInnerSettingType } from '../../../../../modules/component-settings/interfaces/slide-toggle-inner-setting.enum';
import { SettingTypes } from '../../../../../modules/component-settings/interfaces/single-setting/setting-types';
import { ISlideToggleWithScreen } from '../../../../../modules/component-settings/interfaces/by-type/slide-toggle-with-screen.interface';

@Component({
  selector: `
    wb-slide-toggle-with-screen
      [updateVisibilitySettingEvent]
      [updateSlideToggleSettingEvent]
      [innerSettingType]
      [currentSlideToggleSetting]
      [settingType]
      [name]
      [isVisible]
  `,
  templateUrl: './slide-toggle-with-screen.component.html',
  styleUrls: ['./slide-toggle-with-screen.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SlideToggleWithScreenComponent implements ISlideToggleWithScreen {
  @Output() updateVisibilitySettingEvent = new EventEmitter<boolean>();
  @Output() updateSlideToggleSettingEvent = new EventEmitter<SlideToggleInnerSettingType>();
  @Input() settingType: SettingTypes.SlideToggleWithScreen;
  @Input() innerSettingType: SlideToggleInnerSettingType;
  @Input() currentSlideToggleSetting: SlideToggleInnerSettingType;
  @Input() name: string;
  @Input() isVisible: boolean;

  onUpdateVisibilitySetting(event: MatSlideToggleChange): void {
    this.updateVisibilitySettingEvent.emit(event.checked);
  }

  onUpdateSlideToggleSetting(): void {
    this.updateSlideToggleSettingEvent.emit(this.innerSettingType);
  }
}
