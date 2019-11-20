import { HeaderConfig } from '../interfaces/single-component-settings/header-component-settings/header-component-settings.interface';
import { SettingTypes } from '../interfaces/single-setting/setting-types';
import { ComponentSettingsModel } from './component-settings.model';
import { SlideToggleInnerSettingType } from '../interfaces/slide-toggle-inner-setting.enum';

export class HeaderComponentSettingsModel extends ComponentSettingsModel<HeaderConfig>  {
  constructor(
    public id?,
    public currentState: HeaderConfig = {
      logo: {
        slideToggleInnerSettingType: SlideToggleInnerSettingType.Logo,
        type: SettingTypes.SlideToggleWithScreen,
        config: {
          imgSrc: null,
          imgAlt: 'LOGO',
          imgLink: null,
          isVisible: true
        }
      },
      button: {
        slideToggleInnerSettingType: SlideToggleInnerSettingType.Button,
        type: SettingTypes.SlideToggleWithScreen,
        config: {
          buttons: [{
            buttonLink: null,
            buttonText: 'Button'
          }],
          isVisible: true
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
