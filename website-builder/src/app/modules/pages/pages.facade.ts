import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromPagesStore from './store/reducers/pages.reducer';
import * as fromPagesActions from './store/actions/pages.actions';
import { Observable } from 'rxjs';
import { first, map, take } from 'rxjs/operators';
import { PageModel } from './models/page.model';
import { IPage } from './interfaces/page.interface';
import { MatDialog, MatSnackBar } from '@angular/material';
import { IPageSettings } from './interfaces/page-settings.interface';


@Injectable()
export class PagesFacade {
  constructor(
    private store: Store<fromPagesStore.State>,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
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

  get isLastPage(): Promise<boolean> {
    return this.store.pipe(
      select(fromPagesStore.isLastPage),
      first()
    ).toPromise();
  }

  getCurrentPageSettings(): Observable<IPageSettings> {
    return this.store.pipe(select(fromPagesStore.selectCurrentPageSettings));
  }

  getAllPages(): Observable<IPage[]> {
    return this.store.pipe(select(fromPagesStore.selectAll));
  }

  get getCurrentPageId(): Observable<string> {
    return this.store.pipe(select(fromPagesStore.selectCurrentPageId));
  }

  async createPage(page = new PageModel()): Promise<void> {
    await this.checkIsHomeExist(page.settings);
    this.store.dispatch(fromPagesActions.addPage({ page }));
    this.changeCurrentPage(page.id);
  }

  async removePage() {
    /* check if pages more than 1 */
    if (await this.isLastPage) {
      this.snackBar.open('You can not remove last page', null, { panelClass: 'warning' });
      return;
    }

    /* dispatch action for removing page */
    const pageId = await this.getCurrentPageId.pipe(first()).toPromise();
    this.store.dispatch((fromPagesActions.removePageProcess()));

    /* reassign new current page */
    const allPages = await this.getAllPages().pipe(first()).toPromise();
    this.changeCurrentPage(allPages[0].id);
  }

  async checkIsHomeExist(settings: IPageSettings) {
    if (settings.isHome) {
      const homePage: IPage = await this.store.pipe(select(fromPagesStore.selectHomePage)).pipe(first()).toPromise();

      homePage && this.store.dispatch(fromPagesActions.updatePageSettings({
        page: {
          id: homePage.id,
          changes: {
            settings: { ...homePage.settings, isHome: false, pageUrl: homePage.id }
          }
        }
      }));
    }
  }

  async updatePageSettings(settings: IPageSettings) {
    /* Check if isHome has defined before */
    await this.checkIsHomeExist(settings);

    this.store.dispatch(fromPagesActions.updatePageSettings({
      page: {
        id: await this.getCurrentPageId.pipe(first()).toPromise(),
        changes: {
          settings
        }
      }
    }));
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

  get getCurrentPage(): Observable<IPage> {
    return this.store.pipe(select(fromPagesStore.selectCurrentPage));
  }


}
