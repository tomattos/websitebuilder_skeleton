import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ChooseCompanyModalComponent } from './components/choose-company-modal/choose-company-modal.component';
import { Company } from './interfaces/company.interface';
import { select, Store } from '@ngrx/store';
import * as fromStore from './state/reducers';
import { LoadTemplates } from './state/actions/templates.actions';
import { LoadCompanies } from './state/actions/companies.action';
import { Observable, Subscription } from 'rxjs';

@Injectable()
export class TemplatesFacade {
  companiesSubscription: Subscription;
  dialogRef: MatDialogRef<ChooseCompanyModalComponent>;

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

  openChooseCompanyModal(): void {
    this.companiesSubscription = this.store.pipe(select(fromStore.selectAllCompanies)).subscribe((res: Company[]) => {
      this.dialogRef = this.dialog.open(ChooseCompanyModalComponent, {
        width: '500px',
        data: res
      });
    });

    this.dialogRef.afterClosed().subscribe((company: Company) => {
      console.log(company);
      this.companiesSubscription.unsubscribe();
    });
  }
}
