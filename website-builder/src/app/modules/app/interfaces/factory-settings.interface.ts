import { ComponentFactory } from '@angular/core';
import { ComponentSettings } from '../../component-settings/interfaces/component-settings.interface';

export interface FactorySettings {
  factory: ComponentFactory<any>;
  componentSettings: ComponentSettings<any>;
}
