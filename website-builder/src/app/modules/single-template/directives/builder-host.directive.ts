import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[wbBuilderHost]'
})
export class BuilderHostDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
