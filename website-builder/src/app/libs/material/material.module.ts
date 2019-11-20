import { NgModule } from '@angular/core';
import {
  MAT_DIALOG_DEFAULT_OPTIONS,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatDialogModule,
  MatSelectModule,
  MatDialogConfig,
  MatTabsModule,
  MatSlideToggleModule,
  MatSnackBarModule
} from '@angular/material';

const modules = [
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
  MatCheckboxModule,
  MatMenuModule,
  MatDialogModule,
  MatSelectModule,
  MatTabsModule,
  MatSlideToggleModule,
  MatSnackBarModule
];

@NgModule({
  declarations: [],
  imports: [
    ...modules
  ],
  exports: [...modules],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 2000
      }
    },
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {
        ...new MatDialogConfig(),
        panelClass: 'main-dialog'
      } as MatDialogConfig
    }
  ]
})
export class MaterialModule {}
