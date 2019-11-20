import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ComponentSettingsHostDirective } from '../../directives/component-settings-host.directive';
import { ComponentSettings } from '../../interfaces/component-settings.interface';
import { ComponentSettingsFacade } from '../../component-settings.facade';

@Component({
  selector: 'wb-component-settings-modal',
  templateUrl: './component-settings-modal.component.html',
  styleUrls: ['./component-settings-modal.component.scss']
})
export class ComponentSettingsModalComponent implements OnInit {
  @ViewChild(ComponentSettingsHostDirective, { static: true }) wbComponentSettingsHost: ComponentSettingsHostDirective;
  @Input() settings: ComponentSettings<any>;

  constructor(private componentSettingsFacade: ComponentSettingsFacade) { }

  async ngOnInit() {
    await this.componentSettingsFacade.insertSettingsComponent(this.settings, this.wbComponentSettingsHost);
  }

  resetModalSettings() {
    this.componentSettingsFacade.updateOpenedSlideToggleSetting(null);
  }

  async saveComponentPrevStateSetting() {
    await this.componentSettingsFacade.saveComponentPrevStateSetting(this.settings.id);
  }

  async resetComponentCurrentStateToPrevState() {
    await this.componentSettingsFacade.resetComponentCurrentStateToPrevState(this.settings.id);
  }
}
