import { Component, Input, OnInit } from '@angular/core';
import { ComponentBuilderFacade } from '../../component-builder.facade';

@Component({
  selector: 'wb-manipulation-controls',
  templateUrl: './manipulation-controls.component.html',
  styleUrls: ['./manipulation-controls.component.scss']
})
export class ManipulationControlsComponent implements OnInit {
  @Input() componentId: string;

  constructor(private componentBuilderFacade: ComponentBuilderFacade) { }

  ngOnInit() {
  }

  onRemoveSingle() {
    this.componentBuilderFacade.removeSingle(this.componentId);
  }
}
