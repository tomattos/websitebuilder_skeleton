import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import v4 from 'uuid/v4';
import { PagesFacade } from '../../pages.facade';
import { PageModel } from '../../models/page.model';
import { ComponentBuilderFacade } from '../../../component-builder/component-builder.facade';
import { MatDialogRef } from '@angular/material';
import { FormCreatorFacade } from '../../../../libs/form-creator/form-creator.facade.service';

@Component({
  selector: 'wb-create-page-modal',
  templateUrl: './create-page-modal.component.html',
  styleUrls: ['./create-page-modal.component.scss']
})
export class CreatePageModalComponent implements OnInit {
  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<CreatePageModalComponent>,
    private pagesFacade: PagesFacade,
    private componentBuilderFacade: ComponentBuilderFacade,
    private formCreatorFacade: FormCreatorFacade
  ) {}

  ngOnInit() {
    const fields = [
      ['pageName', '', ['required', 'maxLength:32', 'minLength:5']],
      ['pageTitle', '', ['required', 'maxLength:32', 'minLength:5']],
      ['pageDescription', '', ['required', 'maxLength:32', 'minLength:5']],
      ['pageUrl', '', ['required', 'maxLength:32', 'minLength:5']],
      ['isHome', false]
    ];

    this.form = this.formCreatorFacade
      .setFields(fields)
      .build();
  }

  onIsHomeChange(event) {
    if (event.checked) {
      this.form.patchValue({ pageUrl: '' });
      this.form.controls.pageUrl.disable();
    } else {
      this.form.controls.pageUrl.enable();
    }
  }

  async createPage() {
    const { pageUrl, pageTitle, pageName, isHome, pageDescription } = this.form.value;
    const id = v4();
    const newPage = new PageModel(
      id,
      {
        pageUrl,
        pageTitle,
        pageDescription,
        isHome
      },
      pageName
    );

    await this.pagesFacade.createPage(newPage);
    this.closeModal();
    await this.componentBuilderFacade.build();
  }

  closeModal() {
    this.dialogRef.close();
  }
}
