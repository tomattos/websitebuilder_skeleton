import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ComponentSettings } from '../../interfaces/component-settings.interface';

@Component({
  selector: 'wb-inner-component-settings',
  template: ''
})
export class ComponentSettingsComponent<T> {
  @Output() updateSettingsEvent = new EventEmitter<{ settingValue: any, path: string }>();
  @Input() settings: ComponentSettings<T>;

  constructor() { }

  onUpdateSettings(settingValue: any, path: string) {
    this.updateSettingsEvent.emit({ path, settingValue });
  }

}
