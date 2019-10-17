import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Event } from '../entity/event.entity';

@Injectable()
export class EventService {
  constructor(@InjectRepository(Event) eventRepository: Repository<Event>) {}
}
