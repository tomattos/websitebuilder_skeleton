export interface PageSettings {
  pageTitle: string | null;
  pageDescription: string | null;
  pageUrl: string;
  isHome: boolean;
  customCode?: HTMLCollection | null;
}
