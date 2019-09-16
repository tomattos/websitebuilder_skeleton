import { ComponentSchema } from '../interfaces/component-schema.interface';
import { ComponentType } from '../constants/component-type.enum';

export class ComponentSchemaModel implements ComponentSchema {
  constructor(
    public id?: string,
    public pageId?: string,
    public componentType?: ComponentType,
    public componentVersion?: number,
    public forPresentation?: boolean
  ) {}
}
