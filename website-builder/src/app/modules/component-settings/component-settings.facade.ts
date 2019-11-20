import { ComponentFactoryResolver, ComponentRef, Injectable, Type } from '@angular/core';
import * as fromComponentSettingsStore from './store/reducers/component-settings.reducer';
import * as fromComponentBuilderStore from '../component-builder/store/reducers/component-builder.reducer';
import * as ComponentSettingsActions from './store/actions/component-setting.actions';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { ComponentSettings } from './interfaces/component-settings.interface';
import { Observable } from 'rxjs';
import { Update } from '@ngrx/entity';
import { filter, first, map, take, takeUntil } from 'rxjs/operators';
import { ComponentSchema } from '../component-builder/interfaces/component-schema.interface';
import { ComponentType } from '../component-builder/constants/component-type.enum';
import { HeaderComponentSettingsModel } from './models/header-component-settings.model';
import { HeaderComponentSettingsComponent } from './components/header-component-settings/header-component-settings.component';
import { ComponentSettingsComponent } from './components/component-settings/component-settings.component';
import { setValueToFrozenObj } from '../../utils/setValueToFrozenObj';
import { UpdateSettingEvent } from './interfaces/update-setting-event.interface';
import { SlideToggleInnerSettingType } from './interfaces/slide-toggle-inner-setting.enum';
import { ComponentSettingActionTypes } from './store/actions/component-setting.actions';

@Injectable()
export class ComponentSettingsFacade {
  removeComponentSettingsDispatcher$: Observable<string[]>;

  constructor(
    private store: Store<fromComponentSettingsStore.State>,
    private cfr: ComponentFactoryResolver,
    private dispatcher$: ActionsSubject
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

  public async insertSettingsComponent(componentSettings: ComponentSettings<any>, container) {
    const { id } = componentSettings;

    const componentRef = await this.getComponentSchemaById(id)
      .pipe(
        take(1),
        map((componentSchema: ComponentSchema) => {
          const settingsComponent = this.getSettingsComponent(componentSchema);
          const factory = this.cfr.resolveComponentFactory(settingsComponent);
          const componentRef: ComponentRef<ComponentSettingsComponent<any>> = container.viewContainerRef.createComponent(factory);
          return componentRef;
        })
      ).toPromise();

    this.removeComponentSettingsDispatcher$ = this.dispatcher$.pipe(
      filter((action: { type, ids }) => action.type === ComponentSettingActionTypes.RemoveComponentsSettings),
      map(action => action.ids),
      filter((ids: string[]) => ids.includes(id))
    );

    componentRef.instance.updateSettingsEvent
      .pipe(
        takeUntil(this.removeComponentSettingsDispatcher$)
      )
      .subscribe((updateSettingEvent: UpdateSettingEvent) => {
        this.updateComponentCurrentStateSettings(updateSettingEvent.settingValue, updateSettingEvent.path, componentSettings.id);
      });

    componentRef.instance.updateOpenedSlideToggleSettingEvent
      .pipe(
        takeUntil(this.removeComponentSettingsDispatcher$)
      )
      .subscribe((updateOpenedSlideToggleSettingEvent: string) => {
        this.updateOpenedSlideToggleSetting(updateOpenedSlideToggleSettingEvent);
      });

    this.getOpenedSlideToggleSetting()
      .pipe(
        takeUntil(this.removeComponentSettingsDispatcher$)
      )
      .subscribe((currentSlideToggleSetting: SlideToggleInnerSettingType) => {
        componentRef.instance.currentSlideToggleSetting = currentSlideToggleSetting;
      });

    this.getSettingById(componentSettings.id)
      .pipe(
        takeUntil(this.removeComponentSettingsDispatcher$)
      )
      .subscribe((componentSettings: ComponentSettings<any>) => {
        componentRef.instance.settings = componentSettings;
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

  public updateSettingsForComponent(updated: Update<ComponentSettings<any>>) {
    this.store.dispatch(ComponentSettingsActions.updateComponentSettings({ componentSettings: updated }));
  }

  public changeComponentCurrentStateSetting(settingValue: any,
                                            path: string,
                                            settingId: string): Observable<Update<ComponentSettings<any>>> {
    return this.getSettingById(settingId)
      .pipe(
        first(),
        map((componentSettings: ComponentSettings<any>) => {
          const updatedCurrentStateSettings = setValueToFrozenObj(componentSettings.currentState, settingValue, path);

          return {
            id: settingId,
            changes: {
              currentState: updatedCurrentStateSettings
            }
          };
        })
      );
  }

  public changeComponentsSeq(startPoint: number): Observable<Update<ComponentSettings<any>>[]> {
    const changeSeq = (settings: ComponentSettings<any>[]) => settings
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

    return this.store
      .pipe(
        take(1),
        select(fromComponentSettingsStore.selectAll),
        map(changeSeq)
      );
  }

  public updateOpenedSlideToggleSetting(settingName: string) {
    this.store.dispatch(ComponentSettingsActions.updateOpenedSlideToggleSetting({ settingName }));
  }

  public getOpenedSlideToggleSetting(): Observable<SlideToggleInnerSettingType> {
    return this.store.select(fromComponentSettingsStore.selectOpenedSlideToggleSetting);
  }

  public async saveComponentPrevStateSetting(id: string) {
    const componentSettings: ComponentSettings<any> = await this.getSettingById(id).pipe(take(1)).toPromise();

    this.store.dispatch(ComponentSettingsActions.updateComponentSettings({
      componentSettings: {
        id,
        changes: {
          prevState: componentSettings.currentState
        }
      }
    }));
  }

  public async resetComponentCurrentStateToPrevState(id: string) {
    const componentSettings: ComponentSettings<any> = await this.getSettingById(id).pipe(take(1)).toPromise();

    this.store.dispatch(ComponentSettingsActions.updateComponentSettings({
      componentSettings: {
        id,
        changes: {
          currentState: componentSettings.prevState
        }
      }
    }));
  }
}
