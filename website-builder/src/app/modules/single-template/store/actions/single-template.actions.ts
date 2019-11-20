import { createAction, props } from '@ngrx/store';

export const setTargetComponentSeq = createAction(
  '[SingleTemplate] Set Target Component Seq',
  props<{ targetComponentSeq: number }>()
);




