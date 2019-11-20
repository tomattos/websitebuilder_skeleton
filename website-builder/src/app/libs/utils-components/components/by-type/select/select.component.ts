import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SettingTypes } from '../../../../../modules/component-settings/interfaces/single-setting/setting-types';
import { ISelect } from '../../../../../modules/component-settings/interfaces/by-type/select.interface';

@Component({
  selector: `wb-select
               [settingType]`,
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements ISelect {
  @Output() updateSelectedValueEvent: EventEmitter<any>;
  @Input() settingType: SettingTypes.Select;
  @Input() options: any[];
  @Input() value: any;

  constructor() { }

  onUpdateSelectValue(event) {
    this.updateSelectedValueEvent.emit(event);
  }
}
