import { Component } from '@angular/core';
import { HeaderComponent } from '../../header.component';

@Component({
  selector: 'wb-header-first',
  templateUrl: './header-first.component.html',
  styleUrls: ['../../header.component.scss']
})
export class HeaderFirstComponent extends HeaderComponent {
  constructor() {
    super();
    this.componentVersion = 1;
  }
}
