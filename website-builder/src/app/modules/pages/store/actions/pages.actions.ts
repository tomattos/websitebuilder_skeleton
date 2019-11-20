import { Action, createAction, props } from '@ngrx/store';
import { IPage } from '../../interfaces/page.interface';

export interface AIChangeCurrentPage extends Action {
  pageId: string;
}

export enum PagesActionsTypes {
  AddPage = '[Single Template] Add Page',
  ChangeCurrentPage = '[Single Template] Change Current Page',
  UpdatePageSettings = '[Single Template Settings Modal] Update Page Settings',
  RemovePageProcess = '[Single Template Settings Modal] Start Remove Page',
  RemovePage = '[Pages Effects] Remove Page'
}

export const addPage = createAction(
  PagesActionsTypes.AddPage,
  props<{ page: IPage }>()
);

export const changeCurrentPage = createAction(
  PagesActionsTypes.ChangeCurrentPage,
  props<{ pageId: string }>()
);

export const updatePageSettings = createAction(
  PagesActionsTypes.UpdatePageSettings,
  props<{ page }>()
);

export const removePage = createAction(
  PagesActionsTypes.RemovePage,
  props<{ pageId }>()
);

export const removePageProcess = createAction(
  PagesActionsTypes.RemovePageProcess
);
