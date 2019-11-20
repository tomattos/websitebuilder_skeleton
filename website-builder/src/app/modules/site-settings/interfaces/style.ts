export interface IFontFamily {
  value: string;
  options: string[];
}

export interface IFontWeight {
  value: 'bold' | 'normal';
}

export interface IFontSize {
  value: string | number;
}

export interface IFontStyle {
  value: 'italic' | 'normal';
}

export interface IBorderRadius {
  value: string | number;
}

export interface IAlignItems {
  value: 'center' | 'flex-start' | 'flex-end';
}
