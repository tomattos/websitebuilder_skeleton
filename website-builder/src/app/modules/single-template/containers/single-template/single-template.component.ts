import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

import { BuilderHostDirective } from '../../directives/builder-host.directive';

import { ComponentType } from '../../../component-builder/constants/component-type.enum';

import { ComponentBuilderFacade } from '../../../component-builder/component-builder.facade';
import { GeneralSettingsFacade } from '../../../general-settings/general-settings.facade';

@Component({
  selector: 'wb-single-template',
  templateUrl: './single-template.component.html',
  styleUrls: ['./single-template.component.scss']
})
export class SingleTemplateComponent implements OnInit {
  @ViewChild(BuilderHostDirective, { static: true }) wbBuilderHost: BuilderHostDirective;
  total$: Observable<number>;

  constructor(
    private componentBuilderFacade: ComponentBuilderFacade,
    private generalSettingsFacade: GeneralSettingsFacade
  ) {}

  async ngOnInit() {
    this.total$ = this.componentBuilderFacade.getComponentsTotalAmount$;

    this.componentBuilderFacade.setDefaultContainerForBuilding(this.wbBuilderHost);
    await this.componentBuilderFacade.build();
  }

  openGeneralSettingsModal() {
    this.generalSettingsFacade.openGeneralSettingsModal();
  }
}
