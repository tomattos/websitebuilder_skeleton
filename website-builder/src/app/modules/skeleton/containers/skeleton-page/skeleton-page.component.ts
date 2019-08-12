import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../state/reducers';

@Component({
  selector: 'wb-skeleton-page',
  templateUrl: './skeleton-page.component.html',
  styleUrls: ['./skeleton-page.component.css']
})
export class SkeletonPageComponent implements OnInit {

  constructor(private store: Store<fromStore.State>) { }

  ngOnInit() {
  }

}
