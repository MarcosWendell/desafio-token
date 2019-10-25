import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

import { AuthDTO, AuthType } from '@app/models/auth';
import { User } from '@app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api: string = environment.api_server + '/auth';
  redirectUrl: string;
  isLoggedIn = false;

  constructor(private http: HttpClient) { }

  private auth(authType: AuthType, data: AuthDTO) {
    return this.http.post(`${this.api}/${authType}`, data);
  }

  login(data: AuthDTO): Observable<User> {
    return this.auth('login', data) as Observable<User>;
  }

  register(data: AuthDTO) {
    return this.auth('register', data);
  }

  get token() {
    return sessionStorage.getItem('event_token');
  }

  set token(val: string) {
    if (val) {
      sessionStorage.setItem('event_token', val);
    } else {
      sessionStorage.clear();
    }
  }

  get user() {
    return sessionStorage.getItem('user');
  }

  set user(val: string) {
    if (val) {
      sessionStorage.setItem('user', val);
    } else {
      sessionStorage.clear();
    }
  }
}
