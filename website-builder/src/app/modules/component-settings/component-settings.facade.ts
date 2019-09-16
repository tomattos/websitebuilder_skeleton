import { ComponentFactoryResolver, ComponentRef, Injectable, Type } from '@angular/core';
import * as fromComponentSettingsStore from './state/reducers/component-settings.reducer';
import * as fromComponentBuilderStore from '../component-builder/state/reducers/component-builder.reducer';
import * as ComponentSettingsActions from './state/actions/component-setting.actions';
import { select, Store } from '@ngrx/store';
import { ComponentSettings } from './interfaces/component-settings.interface';
import { Observable } from 'rxjs';
import { Update } from '@ngrx/entity';
import { first, map, take } from 'rxjs/operators';
import { ComponentSchema } from '../component-builder/interfaces/component-schema.interface';
import { ComponentType } from '../component-builder/constants/component-type.enum';
import { HeaderComponentSettingsModel } from './models/header-component-settings.model';
import { HeaderComponentSettingsComponent } from './components/header-component-settings/header-component-settings.component';
import { ComponentSettingsComponent } from './components/component-settings/component-settings.component';
import { ComponentSettingsModel } from './models/component-settings.model';
import { setValueToObj } from '../../utils/setValueToObj';

@Injectable()
export class ComponentSettingsFacade {
  constructor(
    private store: Store<fromComponentSettingsStore.State>,
    private cfr: ComponentFactoryResolver
  ) {}

  public getInitialSettings(componentSchema: ComponentSchema): ComponentSettings<any> {
    let componentSettings: ComponentSettings<any>;

    switch (componentSchema.componentType) {
      case ComponentType.HEADER:
        componentSettings = new HeaderComponentSettingsModel(componentSchema.id);
    }

    return componentSettings;
  }

  public getSettingsComponent(componentSchema: ComponentSchema): Type<any> {
    switch (componentSchema.componentType) {
      /* Header settings */
      case ComponentType.HEADER:
        return HeaderComponentSettingsComponent;
    }
  }

  public insertSettingsComponent(componentSettings: ComponentSettings<any>, container) {
    this.getComponentSchemaById(componentSettings.id)
      .pipe(first())
      .subscribe(async (componentSchema: ComponentSchema) => {
        const settingsComponent = this.getSettingsComponent(componentSchema);
        const factory = this.cfr.resolveComponentFactory(settingsComponent);
        const componentRef: ComponentRef<ComponentSettingsComponent<any>> = container.viewContainerRef.createComponent(factory);

        componentRef.instance.settings = await this.getSettingById(componentSchema.id).pipe(first()).toPromise();
        componentRef.instance.updateSettingsEvent.subscribe((event) => {
        //  Todo: unsubscribe when component will be removed
          this.updateComponentCurrentStateSettings(event.settingValue, event.path, componentSettings.id);
        });
      });
  }

  public getSettingById(id: string): Observable<ComponentSettings<any>> {
    return this.store.pipe(select(fromComponentSettingsStore.selectSettingById, { id }));
  }

  private getComponentSchemaById(id: string): Observable<ComponentSchema> {
    return this.store.pipe(select(fromComponentBuilderStore.selectComponentSchemaById, { id }));
  }

  public async updateComponentSeqSettings(startPoint: number) {
    const updated = await this.changeComponentsSeq(startPoint).toPromise();
    this.updateComponentsSettings(updated);
  }

  public async updateComponentCurrentStateSettings(settingValue: any, path: string, settingId: string) {
    const updated = await this.changeComponentCurrentStateSetting(settingValue, path, settingId).toPromise();
    this.updateSettingsForComponent(updated);
  }

  public updateComponentsSettings(updated: Update<ComponentSettings<any>>[]) {
    this.store.dispatch(ComponentSettingsActions.updateComponentsSettings({ componentsSettings: updated }));
  }

  updateSettingsForComponent(updated: Update<ComponentSettings<any>>) {
    this.store.dispatch(ComponentSettingsActions.updateComponentSettings({ componentSettings: updated }));
  }

  changeComponentCurrentStateSetting(settingValue: any, path: string, settingId: string): Observable<Update<ComponentSettings<any>>> {
    return this.getSettingById(settingId)
      .pipe(
        first(),
        map((componentSettings: ComponentSettings<any>) => {
          const updatedSettings = setValueToObj(componentSettings.currentState, settingValue, path);

          return {
            id: settingId,
            changes: updatedSettings
          };
        })
      );
  }

  public changeComponentsSeq(startPoint: number): Observable<Update<ComponentSettings<any>>[]> {
    return this.store
      .pipe(
        take(1),
        select(fromComponentSettingsStore.selectAll),
        map((componentsSettings: ComponentSettings<any>[]) => {
          return componentsSettings
            .filter((setting: ComponentSettings<any>) => setting.seq > startPoint)
            .map((setting: ComponentSettings<any>) => {
              const newSeq = setting.seq + 1;

              return {
                id: setting.id,
                changes: {
                  seq: newSeq
                }
              };
            });
        })
      );
  }
}
