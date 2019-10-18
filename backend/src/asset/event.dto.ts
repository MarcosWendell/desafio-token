import { IsString, Matches } from 'class-validator';

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
