import { createAction, props } from '@ngrx/store';

export const loadSkeletons = createAction(
  '[Skeleton] Load Skeletons'
);

export const loadSkeletonsSuccess = createAction(
  '[Skeleton] Load Skeletons Success',
  props<{ data: any }>()
);

export const loadSkeletonsFailure = createAction(
  '[Skeleton] Load Skeletons Failure',
  props<{ error: any }>()
);
