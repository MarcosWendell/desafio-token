import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';

import { AuthService } from '@app/services/auth.service';
import { EventDTO, Event } from '@app/models/event';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private api: string = environment.api_server + '/api';

  constructor(private http: HttpClient, private auth: AuthService) {}

  private request(method: string, endpoint: string, body?: any) {
    const url = `${this.api}/${endpoint}`;
    return this.http.request(method, url, {
      body,
      headers: { authorization: `Bearer ${this.auth.token}` }
    });
  }

  getEvents(): Observable<Event[]> {
    return this.request('GET', `events`) as Observable<Event[]>;
  }

  getEvent(id: string) {
    return this.request('GET', `events/${id}`);
  }

  createEvent(data: EventDTO) {
    return this.request('POST', `events/create`, data);
  }

  updateEvent(id: string, data: Partial<EventDTO>) {
    console.log(id, data);
    return this.request('PUT', `events/${id}/update`, data);
  }

  deleteEvent(id: string) {
    return this.request('DELETE', `events/${id}/delete`);
  }
}
