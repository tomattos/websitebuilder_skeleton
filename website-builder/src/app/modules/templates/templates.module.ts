import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplatesRoutingModule } from './templates-routing.module';
import { StoreModule } from '@ngrx/store';
import * as fromTemplates from './state/reducers/templates.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TemplatesEffects } from './state/effects/templates.effects';
import { TemplatesFacade } from './templates.facade';
import { TemplatesComponent } from './containers/templates/templates.component';
import { TemplateComponent } from './components/template/template.component';
import { MaterialModule } from '../../libs/material/material.module';
import { ChooseCompanyModalComponent } from './components/choose-company-modal/choose-company-modal.component';
import { TemplatesApi } from './api/templates.api';


@NgModule({
  declarations: [
    TemplatesComponent,
    TemplateComponent,
    ChooseCompanyModalComponent
  ],
  imports: [
    CommonModule,
    TemplatesRoutingModule,
    MaterialModule,
    StoreModule.forFeature(fromTemplates.templatesFeatureKey, fromTemplates.reducer),
    EffectsModule.forFeature([TemplatesEffects])
  ],
  providers: [TemplatesFacade, TemplatesApi],
  entryComponents: [ChooseCompanyModalComponent]
})
export class TemplatesModule { }
