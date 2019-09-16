import { ComponentType } from '../constants/component-type.enum';

export interface ComponentSchema {
  id?: string;
  pageId?: string;
  componentType?: ComponentType;
  componentVersion?: number | 'all';
  forPresentation?: boolean;
}
