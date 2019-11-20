import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentSettings } from '../../interfaces/component-settings.interface';
import { UpdateSettingEvent } from '../../interfaces/update-setting-event.interface';
import { SlideToggleInnerSettingType } from '../../interfaces/slide-toggle-inner-setting.enum';

@Component({
  selector: 'wb-inner-component-settings',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentSettingsComponent<T> {
  @Output() updateSettingsEvent = new EventEmitter<UpdateSettingEvent>();
  @Output() updateOpenedSlideToggleSettingEvent = new EventEmitter<SlideToggleInnerSettingType>();
  @Input() settings: ComponentSettings<T>;
  @Input() currentSlideToggleSetting: SlideToggleInnerSettingType;

  constructor() { }

  onUpdateSettings(settingValue: any, path: string) {
    this.updateSettingsEvent.emit({ path, settingValue });
  }

  onUpdateOpenedSlideToggleSetting(settingName: string) {
    this.updateOpenedSlideToggleSettingEvent.emit(settingName as SlideToggleInnerSettingType);
  }
}
