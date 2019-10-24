import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  username: string;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.username = this.auth.user;
  }
}
