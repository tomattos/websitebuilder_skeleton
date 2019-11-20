import {
  Injectable,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromSingleTemplateStore from './store/reducers/single-template.reducer';
import * as fromSingleTemplateActions from './store/actions/single-template.actions';
import { take } from 'rxjs/operators';

@Injectable()
export class SingleTemplateFacade {
  constructor(private store: Store<fromSingleTemplateStore.State>) {}

  setTargetComponentSeq(
    targetComponentSeq: number): void {

    this.store.dispatch(fromSingleTemplateActions.setTargetComponentSeq({ targetComponentSeq }));
  }

  getTargetComponentSeq(): Promise<number> {
    return this.store.pipe(
      take(1),
      select(fromSingleTemplateStore.selectTargetComponentSeq)
    ).toPromise();
  }
}
