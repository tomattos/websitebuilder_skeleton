import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './containers/app.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './store/app.effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from '../../libs/http';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';
import { LoginEffects } from '../login/store/effects/login.effects';
import { LoginModule } from '../login/login.module';
import { ComponentSettingsModule } from '../component-settings/component-settings.module';
import { ComponentBuilderModule } from '../component-builder/component-builder.module';
import { FormCreatorFacade } from '../../libs/form-creator/form-creator.facade.service';
import { SiteSettingsModule } from '../site-settings/site-settings.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ComponentSettingsModule,
    SiteSettingsModule,
    ComponentBuilderModule,
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([AppEffects, LoginEffects]),
    LoginModule
  ],
  exports: [ComponentSettingsModule],
  providers: [httpInterceptorProviders, FormCreatorFacade],
  bootstrap: [AppComponent]
})
export class AppModule { }
