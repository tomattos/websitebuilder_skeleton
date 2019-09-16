import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatDialogModule,
  MatSelectModule,
  MatDialogConfig,
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatTabsModule,
  MatSlideToggleModule
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
  MatSlideToggleModule
];

@NgModule({
  declarations: [],
  imports: [
    ...modules
  ],
  exports: [...modules],
  providers: [
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
