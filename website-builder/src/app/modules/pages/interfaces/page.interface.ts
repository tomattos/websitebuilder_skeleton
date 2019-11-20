import { IPageSettings } from './page-settings.interface';

export interface IPage {
  id: string;
  settings: IPageSettings;
  pageName: string;
}
