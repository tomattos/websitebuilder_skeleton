import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Template } from '../../interfaces/template.interface';

@Component({
  selector: 'wb-template',
  templateUrl: './template.component.html',
  styleUrls: ['../../containers/templates/templates.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateComponent {
  @Input() data: Template;
}
