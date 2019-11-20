import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { select, Store } from '@ngrx/store';
import * as fromSiteSettingsStore from './store/reducers';
import * as fromGeneralSettingsSubStore from './store/reducers/general-setting.reducer';
import * as GeneralSettingsActions from './store/actions/general-setting.actions';
import { first } from 'rxjs/operators';
import deepUnfreeze from 'deep-unfreeze';
import { IGeneralSettings } from './interfaces/general-settings.interface';
import { ISingleCssSetting } from './interfaces/single-css-setting.interface';
import { SettingTypes } from '../component-settings/interfaces/single-setting/setting-types';
import { SITE_DESCRIPTION, SITE_NAME } from './constants';

@Injectable()
export class SiteSettingsFacade {
  constructor(
    private titleService: Title,
    private metaService: Meta,
    private store: Store<fromSiteSettingsStore.State>
  ) {}

  getGeneralSettings(): Observable<fromGeneralSettingsSubStore.State> {
    return this.store.pipe(select(fromSiteSettingsStore.selectGeneralSettings));
  }

  async updateGeneralSettingsStore(settingsValues: {}): Promise<void> {
    const prevGeneralSettings: IGeneralSettings = await this.getGeneralSettings().pipe(first()).toPromise();
    const newSettings: IGeneralSettings = deepUnfreeze(prevGeneralSettings);

    for (const item in settingsValues) {
      if (newSettings.hasOwnProperty(item)) {
        newSettings[item].config.value = settingsValues[item];
      }
    }

    this.store.dispatch(GeneralSettingsActions.updateGeneralSettings({ newSettings }));
  }

  updateGeneralSettings(generalSettings: IGeneralSettings) {
    Object.keys(generalSettings).forEach((settingKey: string) => {
      const setting: ISingleCssSetting<SettingTypes, any> = generalSettings[settingKey];

      const settingValue = setting.config.value;

      /* set site title */
      if (settingKey === SITE_NAME) {
        this.setDocumentTitle(settingValue);
        return;
      }

      /* set description description */
      if (settingKey === SITE_DESCRIPTION) {
        this.setDocumentMeta('description', settingValue);
        return;
      }

      /* set css variables related to general settings */
      if (setting.cssClassRef) {
        this.setCssVariables(setting.cssClassRef, settingValue);
        return;
      }
    });
  }

  setCssVariables(cssVarName: string, value: string): void {
    document.documentElement.style.setProperty(`--${cssVarName}`, value);
  }

  setDocumentTitle(newTitle: string): void {
    this.titleService.setTitle(newTitle);
  }

  setDocumentMeta(metaName: string, content) {
    this.metaService.updateTag({ content, name: metaName });
  }
}
