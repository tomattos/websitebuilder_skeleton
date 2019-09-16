import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { ComponentControlsHostDirective } from '../../directives/component-controls-host.directive';
import { ComponentSettings } from '../../../component-settings/interfaces/component-settings.interface';
import { ComponentSchema } from '../../interfaces/component-schema.interface';

@Component({
  selector: 'wb-component-controls',
  templateUrl: './component-controls.component.html',
  styleUrls: ['./component-controls.component.scss']
})
export class ComponentControlsComponent {
  @Input() innerComponentSettings: ComponentSettings<any>;
  @ViewChild(ComponentControlsHostDirective, { static: true }) wbComponentControlsHost: ComponentControlsHostDirective;

  get getComponentControlsHost() {
    return this.wbComponentControlsHost;
  }
}
