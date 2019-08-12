import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromSkeleton from './state/reducers/skeleton.reducer';
import { SkeletonPageComponent } from './containers/skeleton-page/skeleton-page.component';
import { EffectsModule } from '@ngrx/effects';
import { SkeletonEffects } from './state/effects/skeleton.effects';



@NgModule({
  declarations: [SkeletonPageComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromSkeleton.skeletonFeatureKey, fromSkeleton.reducer),
    EffectsModule.forFeature([SkeletonEffects])
  ]
})
export class SkeletonModule { }
