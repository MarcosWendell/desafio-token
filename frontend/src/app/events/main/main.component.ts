import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Event } from '@app/models/event';
import { ApiService } from '@app/services/api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  events: Event[];

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api
    .getEvents()
    .pipe(tap(events => (this.events = events)))
    .subscribe();
  }

}
