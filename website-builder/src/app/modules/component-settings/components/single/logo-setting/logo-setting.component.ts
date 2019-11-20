import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ISingleSetting } from '../../../interfaces/single-setting/single-setting.interface';
import { SettingTypes } from '../../../interfaces/single-setting/setting-types';
import { ImageConfig } from '../../../interfaces/single-setting/image-config.interface';

@Component({
  selector: 'wb-logo-setting',
  templateUrl: './logo-setting.component.html',
  styleUrls: ['./logo-setting.component.scss']
})
export class LogoSettingComponent implements OnInit {
  @Output() uploadEvent = new EventEmitter<string>();
  @Input() selfSetting: ISingleSetting<SettingTypes.SlideToggleWithScreen, ImageConfig>;

  constructor() {
  }

  ngOnInit() {
  }

  onUploadEvent(source: string) {
    this.uploadEvent.emit(source);
  }
}
