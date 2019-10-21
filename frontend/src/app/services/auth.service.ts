import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

import { AuthDTO, AuthType } from '@app/models/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api: string = environment.api_server + '/auth';

  constructor(private http: HttpClient) { }

  private auth(authType: AuthType, data: AuthDTO) {
    return this.http.post(`${this.api}/${authType}`, data);
  }

  login(data: AuthDTO) {
    return this.auth('login', data);
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
}
