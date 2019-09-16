import {
  HeaderComponentSettings,
  HeaderConfig
} from '../interfaces/single-component-settings/header-component-settings/header-component-settings.interface';
import { SettingTypes } from '../interfaces/single-setting/setting-types';
import { ComponentSettingsModel } from './component-settings.model';

export class HeaderComponentSettingsModel extends ComponentSettingsModel<HeaderConfig>  {
  constructor(
    public id?,
    public currentState: HeaderConfig = {
      logo: {
        type: SettingTypes.SlideToggleWithScreen,
        config: {
          imgSrc: null,
          imgAlt: 'LOGO',
          imgLink: null,
          isVisible: true
        }
      },
      button: {
        type: SettingTypes.SlideToggleWithScreen,
        config: {
          buttons: [{
            buttonLink: null,
            buttonText: 'Button'
          }]
        }
      },
      pin: {
        type: SettingTypes.SlideToggle,
        config: {
          isFixed: false
        }
      },
      topSpace: {
        type: SettingTypes.Range,
        config: 20
      },
      bottomSpace: {
        type: SettingTypes.Range,
        config: 20
      },
    },
    public settingsTitle: string = 'Header Settings',
  ) {
    super(id, currentState);
  }
}
