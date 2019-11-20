import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesFacade } from './pages.facade';
import { PagesMenuComponent } from './containers/pages-menu/pages-menu.component';
import { MaterialModule } from '../../libs/material/material.module';
import { CreatePageModalComponent } from './containers/create-page-modal/create-page-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { PagesEffects } from './store/effects/pages.effects';



@NgModule({
  declarations: [PagesMenuComponent, CreatePageModalComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([PagesEffects])
  ],
  exports: [
    PagesMenuComponent
  ],
  providers: [PagesFacade],
  entryComponents: [CreatePageModalComponent]
})
export class PagesModule { }
