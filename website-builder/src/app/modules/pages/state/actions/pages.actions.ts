import { createAction, props } from '@ngrx/store';
import { Page } from '../../interfaces/page.interface';

export const loadPageSettings = createAction(
  '[GeneralSettings] Load Page Settings'
);

export const addPage = createAction(
  '[Single Template] Add Page',
  props<{ page: Page }>()
);

export const changeCurrentPage = createAction(
  '[Single Template] Change Current Page',
  props<{ pageId: string }>()
);
