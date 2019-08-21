import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromSites from './state/reducers/sites.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SitesEffects } from './state/effects/sites.effects';
import { SitesComponent } from './containers/sites/sites.component';
import { SitesFacade } from './sites.facade';
import { SitesApi } from './api/sites.api';
import { SitesRoutingModule } from './sites-routing.module';
import { SiteComponent } from './components/site/site.component';
import { MaterialModule } from '../../libs/material/material.module';

@NgModule({
  declarations: [
    SitesComponent,
    SiteComponent
  ],
  imports: [
    CommonModule,
    SitesRoutingModule,
    MaterialModule,
    StoreModule.forFeature(fromSites.sitesFeatureKey, fromSites.reducer),
    EffectsModule.forFeature([SitesEffects])
  ],
  providers: [SitesFacade, SitesApi]
})
export class SitesModule { }
