import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PagesActionsTypes, removePage } from '../actions/pages.actions';
import * as fromComponentBuilderActions from '../../../component-builder/store/actions/component-builder.actions';
import { select, Store } from '@ngrx/store';
import { first, map, switchMap } from 'rxjs/operators';
import * as fromPagesStore from '../reducers/pages.reducer';


@Injectable()
export class PagesEffects {
  constructor(
    private store: Store<{}>,
    private actions$: Actions
  ) {}

  private removePage$ = createEffect(
    () => this.actions$.pipe(
      ofType(PagesActionsTypes.RemovePageProcess),
      switchMap(
        () => this.store
          .pipe(
            first(),
            select(fromPagesStore.selectCurrentPageId),
            map((pageId: string) => {
              this.store.dispatch(removePage({ pageId }));
              return fromComponentBuilderActions.removePageComponentsProcess({ pageId });
            }),
          )
      )
    )
  );
}
