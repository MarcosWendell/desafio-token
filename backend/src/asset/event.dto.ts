import { IsString, Matches } from 'class-validator';

import { UserRO } from './user.dto';

export class EventDTO {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @Matches(/^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]$/)
  startHour: string;

  @Matches(/^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]$/)
  endHour: string;
}

// tslint:disable-next-line: max-classes-per-file
export class EventRO {
  id?: string;
  title: string;
  description: string;
  startHour: string;
  endHour: string;
  owner: UserRO;
}
