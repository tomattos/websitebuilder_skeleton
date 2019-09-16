import { Component, ComponentRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SlideToggleWithScreen } from '../../../interfaces/base/slide-toggle-with-screen.interface';
import { MatSlideToggleChange } from '@angular/material';

@Component({
  selector: 'wb-slide-toggle-with-screen',
  templateUrl: './slide-toggle-with-screen.component.html',
  styleUrls: ['./slide-toggle-with-screen.component.scss']
})
export class SlideToggleWithScreenComponent implements SlideToggleWithScreen, OnInit {
  @Output() updateVisibilitySettingEvent = new EventEmitter<boolean>();
  @Input() name: string;
  @Input() isVisible: boolean;

  ngOnInit() {
  }

  onUpdateVisibilitySetting(event: MatSlideToggleChange): void {
    this.updateVisibilitySettingEvent.emit(event.checked);
  }

}
