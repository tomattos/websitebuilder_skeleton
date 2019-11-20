import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ComponentSettingActionTypes, removeComponentsSettings } from '../actions/component-setting.actions';
import { catchError, exhaustMap, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';



@Injectable()
export class ComponentSettingEffects {
  constructor(private actions$: Actions) {}

  removeComponentSettings$ = createEffect(
    () => this.actions$.pipe(
      ofType(ComponentSettingActionTypes.RemoveComponentsSettingsProcess),
      exhaustMap(({ ids }) => of([]).pipe(
        map(() => removeComponentsSettings({ ids }))
      ))
    )
  );
}
