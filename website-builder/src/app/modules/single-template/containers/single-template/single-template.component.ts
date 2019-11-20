import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

import { BuilderHostDirective } from '../../directives/builder-host.directive';

import { ComponentType } from '../../../component-builder/constants/component-type.enum';

import { ComponentBuilderFacade } from '../../../component-builder/component-builder.facade';
import { SiteSettingsFacade } from '../../../site-settings/site-settings.facade';
import { SiteSettingsModalComponent } from '../../../site-settings/containers/site-settings-modal/site-settings-modal.component';
import { MatDialog } from '@angular/material';

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
    private dialog: MatDialog
  ) {}

  async ngOnInit() {
    this.total$ = this.componentBuilderFacade.getComponentsTotalAmount$;

    this.componentBuilderFacade.setDefaultContainerForBuilding(this.wbBuilderHost);
    await this.componentBuilderFacade.build();
  }

  openGeneralSettingsModal() {
    this.dialog.open(SiteSettingsModalComponent, {
      width: '820px',
      position: {
        top: '20px'
      }
    });
  }
}
