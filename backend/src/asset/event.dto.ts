import { IsString, Matches, IsISO8601, ValidateIf } from 'class-validator';

import { UserRO } from './user.dto';

export class EventDTO {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsISO8601()
  startDate: string;

  @ValidateIf(o => o.endDate !== null)
  @IsISO8601()
  endDate?: string;

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
  startDate: string;
  endDate?: string;
  owner: UserRO;
}
