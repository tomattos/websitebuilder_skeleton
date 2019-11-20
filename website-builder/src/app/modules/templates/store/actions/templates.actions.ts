import { Action } from '@ngrx/store';
import { Template } from '../../interfaces/template.interface';

export enum TemplatesActionTypes {
  LoadTemplates = '[Templates] Load Templates',
  LoadTemplatesSuccess = '[Templates] Load Templates Success',
  LoadTemplatesFailure = '[Templates] Load Templates Failure'
}

// Template Actions
export class LoadTemplates implements Action {
  readonly type = TemplatesActionTypes.LoadTemplates;
}

export class LoadTemplatesSuccess implements Action {
  readonly type = TemplatesActionTypes.LoadTemplatesSuccess;
  constructor(public payload: Template[]) { }
}

export class LoadTemplatesFailure implements Action {
  readonly type = TemplatesActionTypes.LoadTemplatesFailure;
}

export type TemplatesActions = LoadTemplates | LoadTemplatesSuccess | LoadTemplatesFailure;

