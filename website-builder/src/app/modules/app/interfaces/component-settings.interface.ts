import { ComponentSchema } from '../../component-builder/interfaces/component-schema.interface';
import { ComponentSettings } from '../../component-settings/interfaces/component-settings.interface';

export interface ComponentSchemaSettings {
  componentSchema: ComponentSchema;
  componentSettings: ComponentSettings<any>;
}
