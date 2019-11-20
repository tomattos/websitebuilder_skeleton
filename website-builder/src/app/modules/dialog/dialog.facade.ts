import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ComponentType } from '../component-builder/constants/component-type.enum';
import { ChooseComponentModalComponent } from '../component-builder/containers/choose-component-modal/choose-component-modal.component';

@Injectable()
export class DialogFacade {
  dialogRef: MatDialogRef<any>;

  constructor(
    private dialog: MatDialog
  ) {}

  openChooseComponentModal(componentType: ComponentType, backElementRef) {
    this.dialogRef = this.dialog.open(ChooseComponentModalComponent, {
      data: {
        componentType,
        backElementRef
      },
      width: '820px'
    });
  }
}
