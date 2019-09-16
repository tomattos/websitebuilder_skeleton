import { PageSettings } from './page-settings.interface';

export interface Page {
  id: string;
  settings: PageSettings;
  pageName: string;
}
