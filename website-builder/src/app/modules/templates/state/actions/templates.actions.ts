import { Action } from '@ngrx/store';
import { Template } from '../../interfaces/template.interface';
import { Company } from '../../interfaces/company.interface';

export enum TemplatesActionTypes {
  LoadTemplates = '[Templates] Load Templates',
  LoadTemplatesSuccess = '[Templates] Load Templates Success',
  LoadTemplatesFailure = '[Templates] Load Templates Failure',

  LoadCompanies = '[Templates] Load Companies',
  LoadCompaniesSuccess = '[Templates] Load Companies Success',
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

// Companies Actions
export class LoadCompanies implements Action {
  readonly type = TemplatesActionTypes.LoadCompanies;
}

export class LoadCompaniesSuccess implements Action {
  readonly type = TemplatesActionTypes.LoadCompaniesSuccess;
  constructor(public payload: Company[]) {}
}

export type TemplatesActions =
  LoadTemplates | LoadTemplatesSuccess | LoadTemplatesFailure |
  LoadCompanies | LoadCompaniesSuccess;

