import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[wbComponentControlsHost]'
})
export class ComponentControlsHostDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
