import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralSettingsApi } from './api/general-settings.api';
import { GeneralSettingsFacade } from './general-settings.facade';
import { GeneralSettingsModalComponent } from './containers/general-settings-modal/general-settings-modal.component';
import { MaterialModule } from '../../libs/material/material.module';
import { PageSettingsComponent } from './components/page-settings/page-settings.component';
import { GeneralSettingsComponent } from './components/general-settings/general-settings.component';
import { FormSettingsComponent } from './components/form-settings/form-settings.component';

@NgModule({
  declarations: [GeneralSettingsModalComponent, PageSettingsComponent, GeneralSettingsComponent, FormSettingsComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  providers: [GeneralSettingsApi, GeneralSettingsFacade],
  entryComponents: [GeneralSettingsModalComponent]
})
export class GeneralSettingsModule { }
