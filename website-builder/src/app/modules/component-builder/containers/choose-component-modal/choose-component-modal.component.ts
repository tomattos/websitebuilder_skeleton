import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SelectComponentHostDirective } from '../../directives/select-component-host.directive';
import { ComponentBuilderFacade } from '../../component-builder.facade';
import { ComponentType } from '../../constants/component-type.enum';

@Component({
  selector: 'wb-choose-component-modal',
  templateUrl: './choose-component-modal.component.html',
  styleUrls: ['./choose-component-modal.component.scss']
})
export class ChooseComponentModalComponent implements OnInit {
  @ViewChild(SelectComponentHostDirective, { static: true }) wbSelectComponentHost: SelectComponentHostDirective;

  constructor(
    private componentBuilderFacade: ComponentBuilderFacade,
    public dialogRef: MatDialogRef<ChooseComponentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { componentType: ComponentType, backElementRef: ElementRef }
  ) {}

  async ngOnInit() {
    this.componentBuilderFacade.buildForSelectNewComponent(
      { componentType: this.data.componentType },
      this.wbSelectComponentHost,
      this.closeModal.bind(this)
    );
  }

  closeModal() {
    this.dialogRef.close();
  }

  back() {
    this.closeModal();
    this.data.backElementRef.nativeElement.click();
  }
}
