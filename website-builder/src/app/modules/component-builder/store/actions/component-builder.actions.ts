import { Action, createAction, props } from '@ngrx/store';
import { ComponentSchema } from '../../interfaces/component-schema.interface';

export interface AIRemovePageComponents extends Action{
  ids: string[];
}

export enum ComponentBuilderActionTypes {
  AddComponent = '[Builder(Template, Site) Page] Add Component',
  RemovePageComponentsProcess = '[Pages Effect] Start Remove Components Related To This Page',
  RemovePageComponents = '[Component Builder Effect] Remove Components Related To This Page',
  RemoveSingleComponentProcess = '[Manipulation Controls] Start Remove Single Component',
  RemoveSingleComponent = '[Component Builder Effect] Remove Single Component'
}

export const addComponent = createAction(
  ComponentBuilderActionTypes.AddComponent,
  props<{ component: ComponentSchema }>()
);

export const removePageComponentsProcess = createAction(
  ComponentBuilderActionTypes.RemovePageComponentsProcess,
  props<{ pageId: string }>()
);

export const removePageComponents = createAction(
  ComponentBuilderActionTypes.RemovePageComponents,
  props<{ ids: string[] }>()
);

export const removeSingleComponentProcess = createAction(
  ComponentBuilderActionTypes.RemoveSingleComponentProcess,
  props<{ id: string }>()
);

export const removeSingleComponent = createAction(
  ComponentBuilderActionTypes.RemoveSingleComponent,
  props<{ id: string }>()
);
