import { Component, Input, } from '@angular/core';
import { HeaderConfig } from '../../../component-settings/interfaces/single-component-settings/header-component-settings/header-component-settings.interface';
import { ComponentType } from '../../constants/component-type.enum';

@Component({
  selector: 'wb-header',
  template: '',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  componentType: ComponentType;
  protected componentVersion: number;
  @Input() settings?: HeaderConfig;

  constructor() {
    this.componentType = ComponentType.HEADER;
  }
}
