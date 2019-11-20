export interface UpdateSettingEvent {
  settingValue: any;

  /* path must be a path to current setting in store */
  path: string;
}
