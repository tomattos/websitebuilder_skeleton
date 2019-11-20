import { Action } from '@ngrx/store';
import { Company } from '../../interfaces/company.interface';

export enum CompaniesActionTypes {
  LoadCompanies = '[Templates] Load Companies',
  LoadCompaniesSuccess = '[Templates] Load Companies Success',
}

export class LoadCompanies implements Action {
  readonly type = CompaniesActionTypes.LoadCompanies;
}

export class LoadCompaniesSuccess implements Action {
  readonly type = CompaniesActionTypes.LoadCompaniesSuccess;
  constructor(public payload: Company[]) {}
}

export type CompaniesActions = LoadCompanies | LoadCompaniesSuccess;

