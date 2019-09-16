import { EventEmitter } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material';

export interface SlideToggleWithScreen {
  readonly name: string;
  readonly isVisible: boolean;
  updateVisibilitySettingEvent: EventEmitter<boolean>;
  onUpdateVisibilitySetting(event: MatSlideToggleChange): void;
}
