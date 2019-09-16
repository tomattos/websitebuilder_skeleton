import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import generateId from 'uuid/v4';
import { PagesFacade } from '../../pages.facade';
import { PageModel } from '../../models/page.model';
import { ComponentBuilderFacade } from '../../../component-builder/component-builder.facade';
import { MatDialogRef } from '@angular/material';

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
    private componentBuilderFacade: ComponentBuilderFacade
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      pageName: new FormControl('', [Validators.required]),
      pageTitle: new FormControl('', [Validators.required]),
      pageDescription: new FormControl('', [Validators.required]),
      pageUrl: new FormControl('', [Validators.required]),
      isHome: new FormControl(false)
    });
  }

  async createPage() {
    const { pageUrl, pageTitle, pageName, isHome, pageDescription } = this.form.value;
    const id = generateId();
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

    this.pagesFacade.createPage(newPage);
    this.closeModal();
    await this.componentBuilderFacade.build();
  }

  closeModal() {
    this.dialogRef.close();
  }
}
