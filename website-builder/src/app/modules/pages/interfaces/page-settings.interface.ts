export interface IPageSettings {
  pageTitle: string | null;
  pageDescription: string | null;
  pageUrl: string;
  isHome: boolean;
  customCode?: HTMLCollection | null;
}
