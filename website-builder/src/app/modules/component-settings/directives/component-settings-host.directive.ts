import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[wbComponentSettingsHost]'
})
export class ComponentSettingsHostDirective {

  constructor(private viewContainerRef: ViewContainerRef) { }

}
