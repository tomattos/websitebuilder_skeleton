import {
  ActionReducerMap, createFeatureSelector, createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../../../environments/environment';

import * as fromComponentSettingsStore from '../../../component-settings/store/reducers/component-settings.reducer';
import * as fromComponentBuilderStore from '../../../component-builder/store/reducers/component-builder.reducer';
import * as fromPagesStore from '../../../pages/store/reducers/pages.reducer';
import { Dictionary } from '@ngrx/entity';
import { ComponentSchema } from '../../../component-builder/interfaces/component-schema.interface';
import { ComponentSettings } from '../../../component-settings/interfaces/component-settings.interface';

/*
* Feature key
* */
export const stateFeatureKey = 'state';

/*
* State
* */
export interface State {
  componentSettings: fromComponentSettingsStore.State;
  componentBuilder: fromComponentBuilderStore.State;
  pages: fromPagesStore.State;
}

/*
* Application reducer
* */
export const reducers: ActionReducerMap<State> = {
  componentSettings: fromComponentSettingsStore.reducer,
  componentBuilder: fromComponentBuilderStore.reducer,
  pages: fromPagesStore.reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

/*
* Selectors
* */
const selectComponentBuilderState =
  createFeatureSelector<State, fromComponentBuilderStore.State>(fromComponentBuilderStore.componentBuilderFeature);

export const selectLastCreatedComponent = createSelector(
  fromComponentBuilderStore.selectEntities,
  (entities: Dictionary<ComponentSchema>, props: { id: string }) => entities[props.id]
);

export const selectLastCreatedSettings = createSelector(
  fromComponentSettingsStore.selectEntities,
  (entities: Dictionary<ComponentSettings<any>>, props: { id: string }) => entities[props.id]
);

export const selectComponentsByPage = createSelector(
  fromComponentBuilderStore.selectAll,
  fromPagesStore.selectCurrentPageId,
  (components, currentPageId) => components.filter(component => component.pageId === currentPageId)
);

export const selectLastCreatedComponentWithSettings = createSelector(
  selectLastCreatedComponent,
  selectLastCreatedSettings,
  (componentSchema: ComponentSchema, componentSettings: ComponentSettings<any>) => ({
    componentSchema,
    componentSettings
  })
);

export const selectAllComponentsWithSettings = createSelector(
  selectComponentsByPage,
  fromComponentSettingsStore.selectEntities,
  (allComponents: ComponentSchema[], allSettings: Dictionary<ComponentSettings<any>>) => {
    return allComponents.map((componentSchema: ComponentSchema) => ({
      componentSchema,
      componentSettings: allSettings[componentSchema.id]
    }));
  }
);

export const selectComponentsTotalAmountByCurrentPage = createSelector(
  fromComponentBuilderStore.selectAll,
  fromPagesStore.selectCurrentPageId,
  (allComponents: ComponentSchema[], currentPageId: string) => allComponents.filter(component => component.pageId === currentPageId).length
);
