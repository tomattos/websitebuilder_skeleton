import { Component, OnInit } from '@angular/core';
import { PagesFacade } from '../../pages.facade';
import { Observable } from 'rxjs';
import { IPage } from '../../interfaces/page.interface';
import { CreatePageModalComponent } from '../create-page-modal/create-page-modal.component';
import { ComponentBuilderFacade } from '../../../component-builder/component-builder.facade';
import { take } from 'rxjs/operators';

@Component({
  selector: 'wb-pages-menu',
  templateUrl: './pages-menu.component.html',
  styleUrls: ['./pages-menu.component.scss']
})
export class PagesMenuComponent implements OnInit {
  pages$: Observable<IPage[]>;

  constructor(
    private pagesFacade: PagesFacade
  ) { }

  ngOnInit() {
    this.pages$ = this.pagesFacade.getAllPages();
  }

  changeCurrentPage(pageId: string) {
    this.isCurrent(pageId)
      .pipe(take(1))
      .subscribe(async (isCurrent) => {
        if (isCurrent) { return; }

        this.pagesFacade.changeCurrentPage(pageId);
      });
  }

  isCurrent(pageId: string): Observable<boolean> {
    return this.pagesFacade.isCurrent(pageId);
  }

  openCreatePageModal() {
    this.pagesFacade.openCreatePageModal(CreatePageModalComponent);
  }

  get currentPage$(): Observable<IPage> {
    return this.pagesFacade.getCurrentPage;
  }
}
