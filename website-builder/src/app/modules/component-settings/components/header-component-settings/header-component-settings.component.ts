import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ComponentSettingsComponent } from '../component-settings/component-settings.component';
import {
  HeaderComponentSettings,
  HeaderConfig
} from '../../interfaces/single-component-settings/header-component-settings/header-component-settings.interface';

@Component({
  selector: 'wb-header-component-settings',
  templateUrl: './header-component-settings.component.html',
  styleUrls: ['./header-component-settings.component.scss']
})
export class HeaderComponentSettingsComponent extends ComponentSettingsComponent<HeaderConfig> {
  constructor() {
    super();
  }
}
