import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../state/reducers';
import { of } from 'rxjs';
import { Template } from '../../interfaces/template.interface';
import { TemplatesFacade } from '../../templates.facade';
import { ComponentBuilderFacade } from '../../../component-builder/component-builder.facade';
import { HeaderComponent } from '../../../component-builder/components/header/header.component';
import { HeaderFirstComponent } from '../../../component-builder/components/header/component-variants/header-first/header-first.component';

@Component({
  selector: 'wb-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit {
  // Todo: replace temporary mock with backend data
  templates$ = of([
    {
      id: 1,
      name: 'Template 1'
    }
  ]);

  constructor(
    private buildingComponentsFacade: ComponentBuilderFacade,
    private templatesFacade: TemplatesFacade,
    private store: Store<fromStore.State>
  ) {}

  ngOnInit() {
    this.templatesFacade.getCompanies();
  }

  openChooseCompanyModal() {
    this.templatesFacade.openChooseCompanyModal();
  }

  /*
  * track list of templates by index
  * */
  trackById(index, item: Template) {
    return item.id;
  }
}
