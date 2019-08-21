import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentSettingsFacade } from './component-settings.facade';
import { ComponentSettingsApi } from './api/component-settings.api';
import { StoreModule } from '@ngrx/store';
import * as fromComponentSetting from './state/reducers/component-setting.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ComponentSettingEffects } from './state/effects/component-setting.effects';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromComponentSetting.componentSettingFeatureKey, fromComponentSetting.reducer),
    EffectsModule.forFeature([ComponentSettingEffects]),
  ],
  providers: [ComponentSettingsFacade, ComponentSettingsApi]
})
export class ComponentSettingsModule { }
