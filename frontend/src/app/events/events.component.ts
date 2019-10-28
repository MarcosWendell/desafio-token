import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  name: string;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.name = this.auth.user;
  }

  logout() {
    this.auth.isLoggedIn = false;
    this.router.navigate(['/']);
  }
}
