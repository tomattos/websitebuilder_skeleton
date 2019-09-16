import { createAction, props } from '@ngrx/store';
import { ComponentSchema } from '../../interfaces/component-schema.interface';

export enum ComponentBuilderActionTypes {
  AddComponent = '[Builder(Template, Site) Page] Add Component'
}

export const addComponent = createAction(
  ComponentBuilderActionTypes.AddComponent,
  props<{ component: ComponentSchema }>()
);

