import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteSettingsApi } from './api/site-settings.api';
import { SiteSettingsFacade } from './site-settings.facade';
import { SiteSettingsModalComponent } from './containers/site-settings-modal/site-settings-modal.component';
import { MaterialModule } from '../../libs/material/material.module';
import { PageSettingsComponent } from './components/page-settings/page-settings.component';
import { GeneralSettingsComponent } from './components/general-settings/general-settings.component';
import { FormSettingsComponent } from './components/form-settings/form-settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import * as fromGeneralSetting from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { GeneralSettingsEffects } from './store/effects/general-settings.effects';
import { UtilsComponentsModule } from '../../libs/utils-components/utils-components.module';

@NgModule({
  declarations: [
    SiteSettingsModalComponent,
    PageSettingsComponent,
    GeneralSettingsComponent,
    FormSettingsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature(fromGeneralSetting.siteSettingsFeatureKey, fromGeneralSetting.reducer),
    EffectsModule.forFeature([GeneralSettingsEffects]),
    UtilsComponentsModule
  ],
  providers: [SiteSettingsApi, SiteSettingsFacade],
  entryComponents: [SiteSettingsModalComponent]
})
export class SiteSettingsModule { }
