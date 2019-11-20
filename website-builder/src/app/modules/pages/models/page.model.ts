import * as uuid from 'uuid';
import { IPage } from '../interfaces/page.interface';
import { IPageSettings } from '../interfaces/page-settings.interface';

export class PageModel implements IPage {
  constructor(
    public id = uuid.v4(),
    public settings: IPageSettings = {
      isHome: true,
      customCode: null,
      pageDescription: 'Home page description',
      pageTitle: 'Home page',
      pageUrl: ''
    },
    public pageName = 'Home'
  ) {}
}
