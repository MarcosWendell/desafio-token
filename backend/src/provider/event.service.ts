import { Injectable, Inject, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';

import { EventEntity } from './../entity/event.entity';
import { EVENT_REPOSITORY } from '../asset/constants';
import { EventDTO } from '../asset/event.dto';

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
    const event =  await this.eventRepository.findOne(id);

    if (!event) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return event;
  }

  async create(data: EventDTO) {
    const event = await this.eventRepository.create(data);
    return await this.eventRepository.save(event);
  }

  async update(id: string, data: Partial<EventDTO>) {
    let event = await this.eventRepository.findOne(id);

    if (!event) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    await this.eventRepository.update(id, data);

    event = await this.eventRepository.findOne(id);
    return event;
  }

  async remove(id: string) {
    const event = await this.eventRepository.findOne(id);

    if (!event) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    await this.eventRepository.delete(id);
    return event;
  }
}
