import { User } from './user';

export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate?: string;
  startHour: string;
  endHour: string;
  owner: User;
}

export interface EventDTO {
  title: string;
  description: string;
  startDate: string;
  endDate?: string;
  startHour: string;
  endHour: string;
}
