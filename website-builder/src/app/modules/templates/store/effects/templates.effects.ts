import { Injectable } from '@angular/core';
import { exhaustMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { LoadTemplatesSuccess, TemplatesActionTypes } from '../actions/templates.actions';
import { TemplatesApi } from '../../api/templates.api';
import { Template } from '../../interfaces/template.interface';

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
}
