import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormCreatorFacade } from '../../../../libs/form-creator/form-creator.facade.service';
import { FormGroup } from '@angular/forms';
import { IPageSettings } from '../../../pages/interfaces/page-settings.interface';

@Component({
  selector: 'wb-page-settings',
  templateUrl: './page-settings.component.html',
  styleUrls: [
    './page-settings.component.scss',
    '../../containers/site-settings-modal/site-settings-modal.component.scss'
  ]
})
export class PageSettingsComponent implements OnInit {
  @Output() saveFormEvent = new EventEmitter<{}>();
  @Output() closeModalEvent = new EventEmitter();
  @Output() removePageEvent = new EventEmitter();
  @Input() pageSettings: IPageSettings;
  form: FormGroup;

  constructor(private formCreatorFacade: FormCreatorFacade) { }

  ngOnInit() {
    const fields = [
      ['pageTitle', this.pageSettings.pageTitle, ['required', 'maxLength:32', 'minLength:5']],
      ['pageDescription', this.pageSettings.pageDescription, ['required', 'maxLength:32', 'minLength:5']],
      [
        'pageUrl',
        {
          disabled: this.pageSettings.isHome,
          value: this.pageSettings.pageUrl
        },
        ['required', 'maxLength:32', 'minLength:5']
      ],
      ['isHome', this.pageSettings.isHome]
    ];

    this.form = this.formCreatorFacade
      .setFields(fields)
      .build();
  }

  onSaveForm(): void {
    this.saveFormEvent.emit(this.form.value);
  }

  onCloseModal(): void {
    this.closeModalEvent.emit();
  }

  onIsHomeChange(event) {
    if (event.checked) {
      this.form.patchValue({ pageUrl: '' });
      this.form.controls.pageUrl.disable();
    } else {
      this.form.controls.pageUrl.enable();
    }
  }

  onRemovePage() {
    this.removePageEvent.emit();
  }
}
