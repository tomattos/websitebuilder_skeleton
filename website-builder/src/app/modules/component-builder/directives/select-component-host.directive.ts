import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[wbSelectComponentHost]'
})
export class SelectComponentHostDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
