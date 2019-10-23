import { Event } from './event';

export interface User {
  id: string;
  name: string;
  username: string;
  token?: string;
}

export interface UserDTO {
  username: string;
  password: string;
}
