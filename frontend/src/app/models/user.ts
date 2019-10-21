import { Event } from './event';

export interface User {
  id: string;
  name: string;
  username: string;
  password: string;
  events: Event[];
}

export interface UserDTO {
  username: string;
  password: string;
}
