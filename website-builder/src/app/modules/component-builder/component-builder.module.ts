import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { ComponentBuilderFacade } from './component-builder.facade';
import { HeaderFirstComponent } from './components/header/component-variants/header-first/header-first.component';
import { PagesModule } from '../pages/pages.module';
import { ComponentsMenuComponent } from './containers/components-menu/components-menu.component';
import { MaterialModule } from '../../libs/material/material.module';
import { ChooseComponentModalComponent } from './containers/choose-component-modal/choose-component-modal.component';
import { SelectComponentHostDirective } from './directives/select-component-host.directive';
import { DialogModule } from '../dialog/dialog.module';
import { ComponentControlsComponent } from './containers/component-controls/component-controls.component';
import { ComponentControlsHostDirective } from './directives/component-controls-host.directive';
import { HeaderSecondComponent } from './components/header/component-variants/header-second/header-second.component';
import { ComponentSettingsModule } from '../component-settings/component-settings.module';
import { EffectsModule } from '@ngrx/effects';
import { ComponentBuilderEffects } from './store/effects/component-builder.effects';
import { ManipulationControlsComponent } from './containers/manipulation-controls/manipulation-controls.component';

@NgModule({
  declarations: [
    HeaderComponent,
    HeaderFirstComponent,
    HeaderSecondComponent,
    ComponentsMenuComponent,
    ChooseComponentModalComponent,
    SelectComponentHostDirective,
    ComponentControlsComponent,
    ComponentControlsHostDirective,
    ManipulationControlsComponent
  ],
  exports: [
    HeaderComponent,
    HeaderFirstComponent,
    HeaderSecondComponent,
    ComponentsMenuComponent
  ],
  imports: [
    CommonModule,
    PagesModule,
    DialogModule,
    MaterialModule,
    ComponentSettingsModule,
    EffectsModule.forFeature([ComponentBuilderEffects])
  ],
  providers: [ComponentBuilderFacade],
  entryComponents: [
    HeaderComponent,
    HeaderFirstComponent,
    HeaderSecondComponent,
    ComponentControlsComponent,
    ChooseComponentModalComponent
  ]
})
export class ComponentBuilderModule { }
