import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleTemplateComponent } from './containers/single-template/single-template.component';
import { SingleTemplateRoutingModule } from './single-template-routing.module';
import { SingleTemplateFacade } from './single-template.facade';
import { MaterialModule } from '../../libs/material/material.module';
import { BuilderHostDirective } from './directives/builder-host.directive';
import { ComponentSettingsModule } from '../component-settings/component-settings.module';
import { ComponentBuilderModule } from '../component-builder/component-builder.module';
import { PagesModule } from '../pages/pages.module';
import { StoreModule } from '@ngrx/store';
import * as fromSingleTemplate from './store/reducers/single-template.reducer';

@NgModule({
  declarations: [SingleTemplateComponent, BuilderHostDirective],
  imports: [
    CommonModule,
    MaterialModule,
    SingleTemplateRoutingModule,
    ComponentSettingsModule,
    ComponentBuilderModule,
    PagesModule,
    StoreModule.forFeature(fromSingleTemplate.singleTemplateFeatureKey, fromSingleTemplate.reducer),
  ],
  providers: [SingleTemplateFacade]
})
export class SingleTemplateModule { }
