import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { CompaniesActionTypes, LoadCompaniesSuccess } from '../actions/companies.action';
import { exhaustMap, map } from 'rxjs/operators';
import { Company } from '../../interfaces/company.interface';
import { TemplatesApi } from '../../api/templates.api';

@Injectable()
export class CompaniesEffects {
  constructor(
    private templatesApi: TemplatesApi,
    private actions$: Actions
  ) {}

  @Effect()
  getCompanies$: Observable<Action> = this.actions$.pipe(
    ofType(CompaniesActionTypes.LoadCompanies),
    exhaustMap(() => this.templatesApi.getCompanies()
      .pipe(map((payload: Company[]) => new LoadCompaniesSuccess(payload)))
    ));
}
