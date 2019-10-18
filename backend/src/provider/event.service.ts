import { Injectable, Inject, Delete } from '@nestjs/common';
import { Repository } from 'typeorm';

import { EventEntity } from './../entity/event.entity';
import { EVENT_REPOSITORY } from './../shared/constants';
import { EventDTO } from '../shared/event.dto';

@Injectable()
export class EventService {
  constructor(
    @Inject(EVENT_REPOSITORY)
    private readonly eventRepository: Repository<EventEntity>,
  ) {}

  async showAll() {
    return await this.eventRepository.find();
  }

  async find(id: string) {
    return await this.eventRepository.findOne(id);
  }

  async create(data: EventDTO) {
    const event = await this.eventRepository.create(data);
    return await this.eventRepository.save(event);
  }

  async update(id: string, data: Partial<EventDTO>) {
    await this.eventRepository.update(id, data);
    return await this.eventRepository.findOne(id);
  }

  async remove(id: string) {
    await this.eventRepository.delete(id);
    return { deleted: true };
  }
}
