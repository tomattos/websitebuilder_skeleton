import { Component, Input, OnInit } from '@angular/core';
import { SingleSetting } from '../../../interfaces/single-setting/single-setting.interface';
import { SettingTypes } from '../../../interfaces/single-setting/setting-types';
import { ImageConfig } from '../../../interfaces/single-setting/image-config.interface';

@Component({
  selector: 'wb-logo-setting',
  templateUrl: './logo-setting.component.html',
  styleUrls: ['./logo-setting.component.scss']
})
export class LogoSettingComponent implements OnInit {
  @Input() selfSetting: SingleSetting<SettingTypes.SlideToggleWithScreen, ImageConfig>;

  constructor() {
  }

  ngOnInit() {
  }

}
