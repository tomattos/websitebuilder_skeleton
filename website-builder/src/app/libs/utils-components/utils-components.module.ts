import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageUploaderComponent } from './components/image-uploader/image-uploader.component';
import { ColorPickerComponent } from './components/by-type/color-picker/color-picker.component';
import { SlideToggleWithScreenComponent } from './components/by-type/slide-toggle-with-screen/slide-toggle-with-screen.component';
import { SlideToggleWithScreenHeaderComponent } from '../../modules/component-settings/containers/slide-toggle-with-screen-header/slide-toggle-with-screen-header.component';
import { SelectComponent } from './components/by-type/select/select.component';
import { MaterialModule } from '../material/material.module';

const components = [
  ImageUploaderComponent,
  ColorPickerComponent,
  SlideToggleWithScreenComponent,
  SlideToggleWithScreenHeaderComponent,
  SelectComponent,
];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [...components]
})
export class UtilsComponentsModule { }
