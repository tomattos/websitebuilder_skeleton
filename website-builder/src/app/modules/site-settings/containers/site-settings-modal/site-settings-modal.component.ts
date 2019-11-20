import { Component, OnInit } from '@angular/core';
import { SiteSettingsFacade } from '../../site-settings.facade';
import { MatDialogRef } from '@angular/material';
import { PagesFacade } from '../../../pages/pages.facade';
import { IPageSettings } from '../../../pages/interfaces/page-settings.interface';
import { IGeneralSettings } from '../../interfaces/general-settings.interface';

@Component({
  selector: 'wb-general-settings-modal',
  templateUrl: './site-settings-modal.component.html',
  styleUrls: ['./site-settings-modal.component.scss']
})
export class SiteSettingsModalComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<SiteSettingsModalComponent>,
    private siteSettingsFacade: SiteSettingsFacade,
    private pagesFacade: PagesFacade
  ) { }

  ngOnInit() {
  }

  get generalSettings() {
    return this.siteSettingsFacade.getGeneralSettings();
  }

  get pageSettings() {
    return this.pagesFacade.getCurrentPageSettings();
  }

  async updateGeneralSettings(newSettings) {
    await this.siteSettingsFacade.updateGeneralSettingsStore(newSettings as IGeneralSettings);
    this.closeModal();
  }

  async updatePageSettings(pageSettings) {
    await this.pagesFacade.updatePageSettings(pageSettings as IPageSettings);
    this.closeModal();
  }

  closeModal() {
    this.dialogRef.close();
  }

  async removePage() {
    await this.pagesFacade.removePage();
    this.closeModal();
  }
}
