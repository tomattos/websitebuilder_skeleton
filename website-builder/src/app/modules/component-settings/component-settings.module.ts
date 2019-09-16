import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentSettingsFacade } from './component-settings.facade';
import { ComponentSettingsApi } from './api/component-settings.api';
import { EffectsModule } from '@ngrx/effects';
import { ComponentSettingEffects } from './state/effects/component-setting.effects';
import { HeaderComponentSettingsComponent } from './components/header-component-settings/header-component-settings.component';
import { ComponentSettingsModalComponent } from './containers/component-settings-modal/component-settings-modal.component';
import { MaterialModule } from '../../libs/material/material.module';
import { ComponentSettingsHostDirective } from './directives/component-settings-host.directive';
import { ComponentSettingsComponent } from './components/component-settings/component-settings.component';
import { SlideToggleWithScreenComponent } from './components/base/slide-toggle-with-screen/slide-toggle-with-screen.component';
import { LogoSettingComponent } from './components/partial/logo-setting/logo-setting.component';



@NgModule({
  declarations: [
    ComponentSettingsModalComponent,
    HeaderComponentSettingsComponent,
    ComponentSettingsHostDirective,
    ComponentSettingsComponent,
    SlideToggleWithScreenComponent,
    LogoSettingComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    EffectsModule.forFeature([ComponentSettingEffects]),
  ],
  providers: [
    ComponentSettingsFacade,
    ComponentSettingsApi
  ],
  exports: [
    ComponentSettingsModalComponent
  ],
  entryComponents: [
    ComponentSettingsModalComponent,
    HeaderComponentSettingsComponent
  ]
})
export class ComponentSettingsModule { }
