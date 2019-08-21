import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ChooseCompanyModalComponent } from './components/choose-company-modal/choose-company-modal.component';
import { Company } from './interfaces/company.interface';
import { Store } from '@ngrx/store';
import * as fromStore from './state/reducers/templates.reducer';
import { LoadCompanies, LoadTemplates } from './state/actions/templates.actions';

@Injectable()
export class TemplatesFacade {
  constructor(
    private store: Store<fromStore.State>,
    public dialog: MatDialog
  ) {}

  getTemplates(): void {
    this.store.dispatch(new LoadTemplates());
  }

  getCompanies(): void {
    this.store.dispatch(new LoadCompanies());
  }

  openChooseCompanyModal(companies: Company[]): void {
    const dialogRef = this.dialog.open(ChooseCompanyModalComponent, {
      width: '500px',
      data: companies
    });

    dialogRef.afterClosed().subscribe((company: Company) => {
      console.log(company);
    });
  }
}
