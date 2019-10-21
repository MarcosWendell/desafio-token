import { AddError } from './actions/error.action';
import { AppState } from './module/app-store.module';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(new AddError({ error: 'message' }));
  }
}
