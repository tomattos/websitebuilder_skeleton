import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { LoadCompaniesSuccess, LoadTemplates, LoadTemplatesSuccess, TemplatesActionTypes } from '../actions/templates.actions';
import { exhaustMap, map } from 'rxjs/operators';
import { TemplatesApi } from '../../api/templates.api';
import { Template } from '../../interfaces/template.interface';
import { Company } from '../../interfaces/company.interface';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';



@Injectable()
export class TemplatesEffects {
  constructor(
    private templatesApi: TemplatesApi,
    private actions$: Actions
  ) {}

  @Effect()
  getTemplates$: Observable<Action> = this.actions$.pipe(
    ofType(TemplatesActionTypes.LoadTemplates),
    exhaustMap(() => this.templatesApi.getTemplates()
      .pipe(map((payload: Template[]) => new LoadTemplatesSuccess(payload)))
    ));

  @Effect()
  getCompanies$: Observable<Action> = this.actions$.pipe(
    ofType(TemplatesActionTypes.LoadCompanies),
    exhaustMap(() => this.templatesApi.getCompanies()
      .pipe(map((payload: Company[]) => new LoadCompaniesSuccess(payload)))
    ));

}
