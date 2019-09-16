import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromPagesStore from './state/reducers/pages.reducer';
import * as fromPagesActions from './state/actions/pages.actions';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { PageModel } from './models/page.model';
import { Page } from './interfaces/page.interface';
import { MatDialog } from '@angular/material';
import { CreatePageModalComponent } from './containers/create-page-modal/create-page-modal.component';

@Injectable()
export class PagesFacade {
  constructor(
    private store: Store<fromPagesStore.State>,
    private dialog: MatDialog
  ) {}

  ifPagesExist(): Promise<boolean> {
    return this.store.pipe(select(fromPagesStore.selectTotal))
      .pipe(
        take(1),
        map(total => total > 0)
      )
      .toPromise();
  }

  isCurrent(pageId: string): Observable<boolean> {
    return this.getCurrentPageId
      .pipe(
        map(currentId => currentId === pageId)
      );
  }

  getAllPages(): Observable<Page[]> {
    return this.store.pipe(select(fromPagesStore.selectAll));
  }

  get getCurrentPageId(): Observable<string> {
    return this.store.pipe(select(fromPagesStore.selectCurrentPageId));
  }

  createPage(page = new PageModel()): void {
    this.store.dispatch(fromPagesActions.addPage({ page }));
    this.changeCurrentPage(page.id);
  }

  /* dialog.open get component instance from func parameters to prevent circular dependency */
  openCreatePageModal(dialog): void {
    this.dialog.open(dialog, {
      width: '820px',
      position: {
        top: '20px'
      }
    });
  }

  /* Change current page only if expected params pageId is not currentId */
  changeCurrentPage(pageId: string): void {
    this.isCurrent(pageId)
      .pipe(take(1))
      .subscribe(isCurrent => !isCurrent && this.store.dispatch(fromPagesActions.changeCurrentPage({ pageId })));
  }

  get getCurrentPage(): Observable<Page> {
    return this.store.pipe(select(fromPagesStore.selectCurrentPage));
  }
}
