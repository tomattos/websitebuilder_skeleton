import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplatesRoutingModule } from './templates-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TemplatesEffects } from './store/effects/templates.effects';
import { TemplatesFacade } from './templates.facade';
import { TemplatesComponent } from './containers/templates/templates.component';
import { TemplateComponent } from './components/template/template.component';
import { MaterialModule } from '../../libs/material/material.module';
import { ChooseCompanyModalComponent } from './components/choose-company-modal/choose-company-modal.component';
import { TemplatesApi } from './api/templates.api';
import * as fromTemplatesState from './store/reducers';
import { CompaniesEffects } from './store/effects/companies.effects';
import { ComponentBuilderModule } from '../component-builder/component-builder.module';

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
    ComponentBuilderModule,
    StoreModule.forFeature(fromTemplatesState.templatesFeatureKey, fromTemplatesState.reducers),
    EffectsModule.forFeature([TemplatesEffects, CompaniesEffects])
  ],
  providers: [TemplatesFacade, TemplatesApi],
  entryComponents: [ChooseCompanyModalComponent]
})
export class TemplatesModule { }
