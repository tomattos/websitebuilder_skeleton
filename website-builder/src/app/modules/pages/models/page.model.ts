import * as uuid from 'uuid';
import { Page } from '../interfaces/page.interface';
import { PageSettings } from '../interfaces/page-settings.interface';

export class PageModel implements Page {
  constructor(
    public id = uuid.v4(),
    public settings: PageSettings = {
      isHome: true,
      customCode: null,
      pageDescription: 'Home page description',
      pageTitle: 'Home page',
      pageUrl: '/home'
    },
    public pageName = 'Home'
  ) {}
}
