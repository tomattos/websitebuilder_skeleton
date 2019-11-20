import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { flatMap, last, take, takeLast, tap } from 'rxjs/operators';
import { GeneralSettingsActionTypes } from '../actions/general-setting.actions';
import { SiteSettingsFacade } from '../../site-settings.facade';
import { IGeneralSettings } from '../../interfaces/general-settings.interface';

@Injectable()
export class GeneralSettingsEffects {

  /*
  * this effect will observe dispatch action for updating generalSettings in store
  * and take latest updated value and set new values to related css variables
  * */
  updateSettingsRelatedToStoreUpdate = createEffect(
    () => this.actions$.pipe(
      ofType(GeneralSettingsActionTypes.UpdateGeneralSettings),
      flatMap(() => {
        return this.siteSettingsFacade.getGeneralSettings()
          .pipe(
            take(1),
            last()
          );
      }),
      tap((generalSettings: IGeneralSettings) => {
        this.siteSettingsFacade.updateGeneralSettings(generalSettings);
      })
    ),
    { dispatch: false }
  );

  constructor(
    private siteSettingsFacade: SiteSettingsFacade,
    private actions$: Actions
  ) {}
}
