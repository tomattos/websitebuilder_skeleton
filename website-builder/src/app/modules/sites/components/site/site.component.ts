import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Site } from '../../interfaces/site.interface';

@Component({
  selector: 'wb-site',
  templateUrl: './site.component.html',
  styleUrls: ['../../containers/sites/sites.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SiteComponent {
  @Input() data: Site;
  @Output() removeSiteEvent = new EventEmitter<number>();

  removeSite(id: number) {
    this.removeSiteEvent.emit(id);
  }
}
