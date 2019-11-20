import { ComponentSettings } from '../interfaces/component-settings.interface';

export abstract class ComponentSettingsModel<T> implements ComponentSettings<T> {
  seq: number;
  prevState;

  protected constructor(
    public id?,
    public currentState?: T
  ) {
    this.seq = 0;
    this.prevState = null;
  }
}
