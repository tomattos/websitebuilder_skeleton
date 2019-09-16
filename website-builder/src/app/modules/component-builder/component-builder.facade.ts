import { ComponentFactory, ComponentFactoryResolver, ComponentRef, Injectable, Type } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as uuid from 'uuid';
import * as fromApplicationStore from '../../modules/app/state/reducers/index';
import { addComponent } from './state/actions/component-builder.actions';
import { ComponentType } from './constants/component-type.enum';
import { HeaderFirstComponent } from './components/header/component-variants/header-first/header-first.component';
import { ComponentSettings } from '../component-settings/interfaces/component-settings.interface';
import { HeaderComponentSettingsModel } from '../component-settings/models/header-component-settings.model';
import { addComponentSettings } from '../component-settings/state/actions/component-setting.actions';
import { forkJoin, fromEvent, Observable, Subject } from 'rxjs';
import { first, flatMap, map, mergeMap, take, takeUntil } from 'rxjs/operators';
import { ComponentSchema } from './interfaces/component-schema.interface';
import { ComponentSchemaModel } from './models/component-schema.model';
import { FactorySettings } from '../app/interfaces/factory-settings.interface';
import { ComponentSchemaSettings } from '../app/interfaces/component-settings.interface';
import { PagesFacade } from '../pages/pages.facade';
import { HeaderComponent } from './components/header/header.component';
import { ComponentSettingsFacade } from '../component-settings/component-settings.facade';
import { SettingTypes } from '../component-settings/interfaces/single-setting/setting-types';
import { BuildForType } from './constants/build-for.type';
import { ComponentControlsComponent } from './containers/component-controls/component-controls.component';
import { SingleTemplateFacade } from '../single-template/single-template.facade';
import { HeaderSecondComponent } from './components/header/component-variants/header-second/header-second.component';
import { Headers } from './constants/headers';

@Injectable()
export class ComponentBuilderFacade {
  static defaultBuildContainer;

  constructor(
    private cfr: ComponentFactoryResolver,
    private store: Store<fromApplicationStore.State>,
    private pagesFacade: PagesFacade,
    private singleTemplateFacade: SingleTemplateFacade,
    private componentSettingsFacade: ComponentSettingsFacade
  ) {}

  /*
  * getComponents method gives a component class instance,
  * for generating componentFactory in future
  * */
  private static getComponents(componentSchema: ComponentSchema): Type<any> | Type<any>[] {
    switch (componentSchema.componentType) {
      /* Headers */
      case ComponentType.HEADER:
        const headers: Type<HeaderComponent>[] = [...Headers];

        if (componentSchema.componentVersion === 'all') { return headers; }
        return headers[componentSchema.componentVersion as number - 1];

      /* Covers */
      case ComponentType.COVER:
        break;
    }
  }

  /*
  * build method takes components by current page and settings state
  * and generate initial build if it not empty
  * */
  public async build(buildContainer = ComponentBuilderFacade.defaultBuildContainer,
                     buildFor: BuildForType = 'site'): Promise<void> {
    /* Create initial page if it not exist */
    const ifPagesExist = await this.pagesFacade.ifPagesExist();

    if (!ifPagesExist) {
      this.pagesFacade.createPage();
    }

    this.getComponentsWithSettings$
      .pipe(
        take(1),
        map((componentWithSettings): FactorySettings[] =>
          componentWithSettings
            .map(({ componentSchema, componentSettings }): FactorySettings => ({
              componentSettings,
              factory: this.createComponentFactory(componentSchema) as ComponentFactory<any>
            }))
        )
      )
      .subscribe((factoriesAndSettings: FactorySettings[]) => {
        this.clearBuilderContainer(buildContainer);

        factoriesAndSettings.forEach((factoryAndSettings) => {
          buildFor === 'site'
            ? this.applyComponent(factoryAndSettings)
            : this.applyComponentWithControls(factoryAndSettings);
        });
      });
  }

  /*
  * buildForSelectNewComponent method will build temporary factories and settings
  * for all component versions you choose previously in the modal window
  * */
  public buildForSelectNewComponent(componentSchema: ComponentSchema,
                                    buildContainer,
                                    callback): void {
    const emitCloseModal = new Subject<void>();
    const factories = this.createComponentFactory({
      componentType: componentSchema.componentType,
      componentVersion: 'all'
    }) as ComponentFactory<any>[];

    /* One settings instance for all previously created factories */
    const componentSettings = this.componentSettingsFacade.getInitialSettings({
      componentType: componentSchema.componentType
    });

    factories.forEach(async (factory: ComponentFactory<any>) => {
      const componentRef = await this.applyComponent({ factory, componentSettings }, buildContainer);
      const nativeElement = componentRef.location.nativeElement;
      const componentVersion = componentRef.instance.componentVersion;
      const targetSeq = await this.singleTemplateFacade.getTargetComponentSeq();
      const newSeq = targetSeq === null ? 0 : targetSeq + 1;

      /* Set up styles to applied component */
      nativeElement.classList.add('presentation-variant');

      /*
      * Subscribe to click event on each component, proposed in modal window,
      * and add new component to template after emit this "click" event
      * */
      fromEvent(nativeElement.children[0], 'click')
        .pipe(takeUntil(emitCloseModal))
        .subscribe(async () => {
          /*
          * After adding new component we need to update sequence of all components next to already created
          * */
          await this.componentSettingsFacade.updateComponentSeqSettings(targetSeq);

          this.addComponent(
            {
              componentVersion,
              componentType: componentSchema.componentType
            },
            newSeq
          );

          /*
          * "callback" will close modal,
          * and after emitCloseModal Subject gives to all subscriptions information about unsubscribe
          * */
          callback();
          emitCloseModal.complete();
        });
    });
  }

  public setDefaultContainerForBuilding(builderContainer): void {
    ComponentBuilderFacade.defaultBuildContainer = builderContainer;
  }

  public async addComponent(componentSchema: ComponentSchema,
                            seq: number): Promise<void> {
    const { componentType, componentVersion } = componentSchema;
    const id: string = uuid.v4();
    const pageId: string = await this.pagesFacade.getCurrentPageId.pipe(first()).toPromise();
    const component: ComponentSchema = new ComponentSchemaModel(id, pageId, componentType, componentVersion as number);
    const componentSettings: ComponentSettings<any> = { ...this.componentSettingsFacade.getInitialSettings(component), seq };

    /*
    * Add new component reference to the store
    * */
    this.store.dispatch(addComponent({ component }));
    this.store.dispatch(addComponentSettings({ componentSettings }));

    /*
    * Return already created component
    * and settings for it
    * */
    this.store.pipe(select(fromApplicationStore.selectLastCreatedComponentWithSettings, { id }))
      .pipe(
        take(1),
        mergeMap(
          async (schemaSettings: ComponentSchemaSettings) => {
            const factory = this.createComponentFactory(schemaSettings.componentSchema) as ComponentFactory<any>;
            const componentRef = await this.applyComponentWithControls(
              {
                factory,
                componentSettings: schemaSettings.componentSettings
              },
              ComponentBuilderFacade.defaultBuildContainer
            );

            /*
            * after creating the component with settings we will subscribe to
            * updating this particular settings in store for updating component @Input: settings
            * */
            return this.componentSettingsFacade.getSettingById(schemaSettings.componentSettings.id)
            // Todo: unsubscribe from store after component will be removed
              .pipe(
                map((componentSettings: ComponentSettings<any>) => {
                  componentRef.instance.settings = componentSettings.currentState;
                })
              );
          }
        )
      )
      .subscribe();
  }

  /*
  * This method can produce one factory or array of factories
  * */
  createComponentFactory(componentSchema: ComponentSchema): ComponentFactory<any> | ComponentFactory<any>[] {
    const componentsInstances = ComponentBuilderFacade.getComponents(componentSchema);

    if (Array.isArray(componentsInstances)) {
      return componentsInstances.map(instance => this.resolveComponentFactory(instance));
    }

    return this.resolveComponentFactory(componentsInstances as Type<any>);
  }

  resolveComponentFactory(componentInstance: Type<any>): ComponentFactory<any> {
    return this.cfr.resolveComponentFactory(componentInstance);
  }

  /*
  * applyComponent method universally,
  * it can apply components to local viewContainerRef (which initialize in OnInit hook for main building)
  * or you can path your own viewContainerRef through the method property,
  * for example: For choose-component-modal.component.ts, for building list of available component's variants
  * */
  async applyComponent(factoryAndSettings: FactorySettings,
                       buildContainer = ComponentBuilderFacade.defaultBuildContainer): Promise<ComponentRef<any>> {
    return new Promise((resolve) => {
      const componentRef = buildContainer.viewContainerRef.createComponent(factoryAndSettings.factory);

      /* Set settings @Input into already created component */
      componentRef.instance.settings = factoryAndSettings.componentSettings.currentState;

      return resolve(componentRef);
    });
  }

  async applyComponentWithControls(factoryAndSettings: FactorySettings,
                                   buildContainer = ComponentBuilderFacade.defaultBuildContainer): Promise<ComponentRef<any>> {
    const controlsComponentFactory = this.cfr.resolveComponentFactory(ComponentControlsComponent);
    const controlsComponentRef = buildContainer.viewContainerRef.createComponent(
      controlsComponentFactory,
      factoryAndSettings.componentSettings.seq
    );
    const innerComponentRef = await this.applyComponent(
      factoryAndSettings,
      controlsComponentRef.instance.getComponentControlsHost
    );

    this.componentSettingsFacade.getSettingById(factoryAndSettings.componentSettings.id)
      .subscribe((componentSettings: ComponentSettings<any>) => {
        controlsComponentRef.instance.innerComponentSettings = componentSettings;
      });

    return innerComponentRef;
  }

  clearBuilderContainer(buildContainer = ComponentBuilderFacade.defaultBuildContainer): void {
    buildContainer.viewContainerRef.clear();
  }

  get getComponentsNamesList(): ComponentType[] {
    return Object.values(ComponentType);
  }

  /*
  * getComponentsWithSettings method return all components and settings
  * from two different stores by <page> property
  * */
  get getComponentsWithSettings$(): Observable<ComponentSchemaSettings[]> {
    return this.store.pipe(select(fromApplicationStore.selectAllComponentsWithSettings));
  }

  get getComponentsTotalAmount$(): Observable<number> {
    return this.store.pipe(select(fromApplicationStore.selectComponentsTotalAmountByCurrentPage));
  }
}
