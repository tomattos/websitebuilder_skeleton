import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Company } from '../../interfaces/company.interface';

@Component({
  selector: 'wb-choose-company-modal',
  templateUrl: './choose-company-modal.component.html',
  styleUrls: ['./choose-company-modal.component.scss']
})
export class ChooseCompanyModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ChooseCompanyModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Company[]
  ) {}
}
