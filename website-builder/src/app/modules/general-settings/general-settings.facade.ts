import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { GeneralSettingsModalComponent } from './containers/general-settings-modal/general-settings-modal.component';

@Injectable()
export class GeneralSettingsFacade {
  dialogRef: MatDialogRef<GeneralSettingsModalComponent>;

  constructor(private dialog: MatDialog) {}

  openGeneralSettingsModal() {
    this.dialog.open(GeneralSettingsModalComponent, {
      width: '820px',
      position: {
        top: '20px'
      }
    });
  }
}
