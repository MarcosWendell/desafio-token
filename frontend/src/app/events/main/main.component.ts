import { Component, OnInit, TemplateRef } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Event } from '@app/models/event';
import { ApiService } from '@app/services/api.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  modalRef: BsModalRef;
  events: Event[];
  eventId: string;
  index: number;

  constructor(private api: ApiService, private modal: BsModalService) {}

  ngOnInit() {
    this.api
      .getEvents()
      .pipe(tap((events) => {
        for (const event of events) {
          event.startDate = new Date(event.startDate).toDateString();
        }
        this.events = events;
      }))
      .subscribe();
  }

  // toDateFormat(date: Date) {
  //   return `${day} de ${month}`
  // }

  openModal(template: TemplateRef<any>, id: string, index: number) {
    this.eventId = id;
    this.index = index;
    this.modalRef = this.modal.show(template);
  }

  delete() {
    this.api
      .deleteEvent(this.eventId)
      .pipe(
        tap(() => {
          this.events.splice(this.index);
        })
      )
      .subscribe();
    this.modalRef.hide();
  }
}
