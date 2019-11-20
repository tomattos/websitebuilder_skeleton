import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromSitesStore from '../../store/reducers/sites.reducer';
import { SitesFacade } from '../../sites.facade';
import { Observable } from 'rxjs';
import { Site } from '../../interfaces/site.interface';

@Component({
  selector: 'wb-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.scss'],
})
export class SitesComponent implements OnInit {
  sites$: Observable<Site[]>;

  constructor(
    private store: Store<fromSitesStore.State>,
    private readonly sitesFacade: SitesFacade
  ) {
    this.sites$ = store.pipe(select(fromSitesStore.selectAll));
  }

  ngOnInit(): void {
    this.sitesFacade.getAllSites();
  }

  logout(): void {
    this.sitesFacade.logout();
  }

  removeSite(id: number): void {
    this.sitesFacade.removeSite(id);
  }

  /*
  * track list of sites by index
  * */
  trackById(index, item: Site) {
    return item.id;
  }
}
