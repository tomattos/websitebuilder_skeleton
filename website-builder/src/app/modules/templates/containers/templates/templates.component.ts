import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromStore from '../../state/reducers/templates.reducer';
import { Observable, of } from 'rxjs';
import { Template } from '../../interfaces/template.interface';
import { TemplatesFacade } from '../../templates.facade';
import { Company } from '../../interfaces/company.interface';
import { take } from 'rxjs/operators';

@Component({
  selector: 'wb-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit {
  companies: Company[];
  // Todo: replace temporary mock with backend data
  templates$ = of([
    {
      id: 1,
      name: 'Template 1'
    }
  ]);

  constructor(
    private templatesFacade: TemplatesFacade,
    private store: Store<fromStore.State>
  ) {
    this.store.pipe(select(fromStore.selectAllCompanies))
      .pipe(take(1))
      .subscribe((companies: Company[]) => {
        this.companies = companies;
      });
  }

  ngOnInit() {
    this.templatesFacade.getCompanies();
  }

  openChooseCompanyModal() {
    this.templatesFacade.openChooseCompanyModal(this.companies);
  }

  /*
  * track list of templates by index
  * */
  trackById(index, item: Template) {
    return item.id;
  }
}
