import { AfterViewInit, Component, ComponentRef, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ComponentBuilderFacade } from '../../component-builder.facade';
import { ComponentType } from '../../constants/component-type.enum';
import { DialogFacade } from '../../../dialog/dialog.facade';
import { MatMenu, MatMenuPanel, MatMenuTrigger } from '@angular/material';
import { SingleTemplateFacade } from '../../../single-template/single-template.facade';

@Component({
  selector: 'wb-components-menu',
  templateUrl: './components-menu.component.html',
  styleUrls: ['./components-menu.component.scss']
})
export class ComponentsMenuComponent implements OnInit {
  @ViewChild('componentMenuAddButton', {static: true}) trigger: ElementRef;

  isVisible = false;
  @Input() targetComponentSeq: number;
  @Input() size = 100;

  constructor(
    private componentBuilderFacade: ComponentBuilderFacade,
    private singleTemplateFacade: SingleTemplateFacade,
    private dialogFacade: DialogFacade
  ) { }

  ngOnInit(): void {}

  openChooseComponentModal(componentType: ComponentType) {
    this.dialogFacade.openChooseComponentModal(componentType, this.trigger);
  }

  setTargetComponentSeq() {
    this.singleTemplateFacade.setTargetComponentSeq(this.targetComponentSeq);
  }

  toggleVisibleClass() {
    this.isVisible = !this.isVisible;
  }

  get componentsNamesList() {
    return this.componentBuilderFacade.getComponentsNamesList;
  }
}
