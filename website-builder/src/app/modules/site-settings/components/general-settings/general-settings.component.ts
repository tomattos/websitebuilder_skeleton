import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as fromGeneralSettingsSubStore from '../../store/reducers/general-setting.reducer';
import { FormCreatorFacade } from '../../../../libs/form-creator/form-creator.facade.service';

@Component({
  selector: 'wb-general-settings',
  templateUrl: './general-settings.component.html',
  styleUrls: [
    './general-settings.component.scss',
    '../../containers/site-settings-modal/site-settings-modal.component.scss'
  ]
})
export class GeneralSettingsComponent implements OnInit {
  @Output() saveFormEvent = new EventEmitter<{}>();
  @Output() closeModalEvent = new EventEmitter();
  @Input() generalSettings: fromGeneralSettingsSubStore.State;
  form: FormGroup;
  /*
  * typography state variable created for making loop for typography settings,
  * and leave this.form in normalize state
  * */
  typography: [string, string, string][];

  constructor(private formCreatorFacade: FormCreatorFacade) {}

  ngOnInit() {
    const fields = [
      ['siteName', this.generalSettings.siteName.config.value, ['required', 'maxLength:32', 'minLength:2']],
      ['siteDescription', this.generalSettings.siteDescription.config.value, ['required', 'maxLength:32', 'minLength:2']],
      ['primaryColor', this.generalSettings.primaryColor.config.value, ['required']],
      ['secondaryColor', this.generalSettings.secondaryColor.config.value, ['required']],
      ['backgroundColor', this.generalSettings.backgroundColor.config.value, ['required']],
      // buttonStyle,
      ['titleFontFamily', this.generalSettings.titleFontFamily.config.value, ['required']],
      ['titleFontSize', this.generalSettings.titleFontSize.config.value, ['required']],
      ['subtitleFontSize', this.generalSettings.subtitleFontSize.config.value, ['required']],
      ['subtitleFontFamily', this.generalSettings.subtitleFontFamily.config.value, ['required']],
      ['textFontFamily', this.generalSettings.textFontFamily.config.value, ['required']],
      ['textFontSize', this.generalSettings.textFontSize.config.value, ['required']],
      ['subtextFontFamily', this.generalSettings.subtextFontFamily.config.value, ['required']],
      ['subtextFontSize', this.generalSettings.subtextFontSize.config.value, ['required']],
    ];

    this.form = this.formCreatorFacade
      .setFields(fields)
      .build();

    this.typography = [
      ['titleFontFamily', 'titleFontSize', 'Title H1'],
      ['subtitleFontFamily', 'subtitleFontSize', 'Subtitle H2'],
      ['textFontFamily', 'textFontSize', 'Text p'],
      ['subtextFontFamily', 'subtextFontSize', 'Subtext H6']
    ];
  }

  onSaveForm(): void {
    this.saveFormEvent.emit(this.form.value);
  }

  onCloseModal(): void {
    this.closeModalEvent.emit();
  }

  updateColor($event: string, fieldName: string): void {
    this.form.controls[fieldName].setValue($event);
  }
}
