import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentSettingsFacade } from '../../component-settings.facade';

@Component({
  selector: 'wb-slide-toggle-with-screen-header',
  templateUrl: './slide-toggle-with-screen-header.component.html',
  styleUrls: ['./slide-toggle-with-screen-header.component.scss']
})
export class SlideToggleWithScreenHeaderComponent {
  @Input() title: string;

  constructor(private componentSettingsFacade: ComponentSettingsFacade) {}

  backToMainSettingsScreen() {
    this.componentSettingsFacade.updateOpenedSlideToggleSetting(null);
  }
}
