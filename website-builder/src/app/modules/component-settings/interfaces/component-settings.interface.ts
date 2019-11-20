export interface ComponentSettings<T> {
  id?: string;
  seq?: number;
  prevState?: T | null;
  currentState?: T;
  settingsTitle?: string;
}

