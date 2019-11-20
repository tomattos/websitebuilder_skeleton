import { Action, createReducer, on } from '@ngrx/store';
import { EmButtonVariant, IGeneralButtonsSettings, ISingleButtonSetting } from '../../interfaces/general-button-settings.interface';
import { SettingTypes } from '../../../component-settings/interfaces/single-setting/setting-types';
import { ISingleSetting } from '../../../component-settings/interfaces/single-setting/single-setting.interface';
import { IFontFamily, IFontSize } from '../../interfaces/style';
import * as GeneralSettingsActions from '../actions/general-setting.actions';
import { IGeneralSettings } from '../../interfaces/general-settings.interface';
import { SITE_DESCRIPTION, SITE_NAME } from '../../constants';

export const generalSettingFeatureKey = 'generalSettings';

export interface State extends IGeneralSettings {}

const singleButtonState: ISingleButtonSetting = {
  alignItems: {
    config: {
      value: 'center'
    },
    type: SettingTypes.IconButton,
    cssClassRef: 'button-alignment'
  },
  fontSize: {
    config: {
      value: '16px'
    },
    type: SettingTypes.Input,
    cssClassRef: 'button-font-size'
  },
  fontWeight: {
    config: {
      value: 'normal'
    },
    type: SettingTypes.IconButton,
    cssClassRef: 'button-font-weight'
  },
  fontStyle: {
    config: {
      value: 'normal'
    },
    type: SettingTypes.IconButton,
    cssClassRef: 'button-font-style'
  },
  shadow: {
    config: {
      isVisible: true
    },
    type: SettingTypes.SlideToggle
  },
  rounded: {
    config: {
      value: '30px'
    },
    type: SettingTypes.Range,
    cssClassRef: 'button-border-radius'
  }
};

export const initialState: State = {
  [SITE_NAME]: {
    config: {
      value: 'Your site'
    },
    type: SettingTypes.Input
  },
  [SITE_DESCRIPTION]: {
    config: {
      value: 'Site description'
    },
    type: SettingTypes.Input
  },
  connectAnalytics: '',
  primaryColor: {
    config: {
      value: '#3e69d6'
    },
    type: SettingTypes.ColorPicker,
    cssClassRef: 'primary-color'
  },
  secondaryColor: {
    config: {
      value: '#b6f2fa'
    },
    type: SettingTypes.ColorPicker,
    cssClassRef: 'secondary-color'
  },
  backgroundColor: {
    config: {
      value: '#f8fafb'
    },
    type: SettingTypes.ColorPicker,
    cssClassRef: 'background-color'
  },
  buttons: {
    primary: { ...singleButtonState },
    secondary: { ...singleButtonState }
  },
  titleFontFamily: {
    config: {
      value: 'Roboto',
      options: ['Roboto', 'Open Sans']
    },
    type: SettingTypes.Select,
    cssClassRef: 'h1-font-family'
  },
  titleFontSize: {
    config: {
      value: 50
    },
    type: SettingTypes.Input,
    cssClassRef: 'h1-font-size'
  },
  subtitleFontFamily: {
    config: {
      value: 'Roboto',
      options: ['Roboto', 'Open Sans']
    },
    type: SettingTypes.Select,
    cssClassRef: 'h2-font-family'
  },
  subtitleFontSize: {
    config: {
      value: 36
    },
    type: SettingTypes.Input,
    cssClassRef: 'h2-font-size'
  },
  textFontFamily: {
    config: {
      value: 'Roboto',
      options: ['Roboto', 'Open Sans']
    },
    type: SettingTypes.Select,
    cssClassRef: 'p-font-family'
  },
  textFontSize: {
    config: {
      value: 16
    },
    type: SettingTypes.Input,
    cssClassRef: 'p-font-size'
  },
  subtextFontFamily: {
    config: {
      value: 'Roboto',
      options: ['Roboto', 'Open Sans']
    },
    type: SettingTypes.Select,
    cssClassRef: 'subtext-font-family'
  },
  subtextFontSize: {
    config: {
      value: 14
    },
    type: SettingTypes.Input,
    cssClassRef: 'subtext-font-size'
  },
};

const generalSettingReducer = createReducer(
  initialState,
  on(GeneralSettingsActions.updateGeneralSettings, (state, { newSettings }) => ({ ...newSettings }))
);

export function reducer(state: State | undefined, action: Action) {
  return generalSettingReducer(state, action);
}
