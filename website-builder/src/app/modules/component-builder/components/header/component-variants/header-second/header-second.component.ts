import { Component } from '@angular/core';
import { HeaderComponent } from '../../header.component';

@Component({
  selector: 'wb-header-first',
  templateUrl: './header-second.component.html',
  styleUrls: ['../../header.component.scss']
})
export class HeaderSecondComponent extends HeaderComponent {
  constructor() {
    super();
    this.componentVersion = 2;
  }
}
