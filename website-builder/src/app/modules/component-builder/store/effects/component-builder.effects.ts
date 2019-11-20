import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, first, map, switchMap } from 'rxjs/operators';
import { ComponentBuilderActionTypes, removePageComponents, removeSingleComponent, removeSingleComponentProcess } from '../actions/component-builder.actions';
import * as componentSettingActions from '../../../component-settings/store/actions/component-setting.actions';
import * as fromComponentBuilderStore from '../reducers/component-builder.reducer';
import { Action, select, Store } from '@ngrx/store';
import { of } from 'rxjs';

/*
* Why do I remove component from Effect?
* In future, first of all we need to remove components from backend and after locally
* */

@Injectable()
export class ComponentBuilderEffects {
  constructor(
    private store: Store<{}>,
    private actions$: Actions
  ) {}

  removePageComponents$ = createEffect(
    () => this.actions$.pipe(
      ofType(ComponentBuilderActionTypes.RemovePageComponentsProcess),
      switchMap(
        ({ pageId }) => this.store
          .pipe(
            first(),
            select(fromComponentBuilderStore.selectComponentsByPageId, { pageId }),
            map((ids) => {
              this.store.dispatch(removePageComponents({ ids }));
              return componentSettingActions.removeComponentsSettingsProcess({ ids });
            })
          )
      )
    )
  );

  removeSingle$ = createEffect(
    () => this.actions$.pipe(
      ofType(ComponentBuilderActionTypes.RemoveSingleComponentProcess),
      switchMap(
        (action: { type, id }) => of(removeSingleComponent({ id: action.id }))
      )
    )
  );
}
