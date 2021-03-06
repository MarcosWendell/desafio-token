import {
  Injectable,
  Inject,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Repository } from 'typeorm';

import { EVENT_REPOSITORY } from '../asset/constants';
import { EventEntity } from './../entity/event.entity';
import { EventDTO, EventRO, DateCheckDTO } from '../asset/event.dto';
import { UserService } from './user.service';

@Injectable()
export class EventService {
  constructor(
    @Inject(EVENT_REPOSITORY)
    private readonly eventRepository: Repository<EventEntity>,
    private readonly userService: UserService,
  ) {}

  private toResponseObject(event: EventEntity): EventRO {
    return { ...event, owner: event.owner.toResponseObject() };
  }

  private ensureOwnership(event: EventEntity, userId: string) {
    if (event.owner.id !== userId) {
      throw new HttpException('Incorrect user', HttpStatus.UNAUTHORIZED);
    }
  }

  async showAll(userId: string): Promise<EventRO[]> {
    const events = await this.eventRepository.find({
      where: { owner: userId },
      relations: ['owner'],
    });
    return events.map(event => this.toResponseObject(event));
  }

  async check(data: DateCheckDTO) {
    const events = await this.eventRepository.find();
    for (const event of events) {
      if (event.startDate.split('T')[0] === data.sDate.split('T')[0]) {
        return false;
      }
    }
    return true;
  }

  async find(id: string): Promise<EventRO> {
    const event = await this.eventRepository.findOne({
      where: { id },
      relations: ['owner'],
    });

    if (!event) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return this.toResponseObject(event);
  }

  async create(userId: string, data: EventDTO): Promise<EventRO> {
    const events = await this.eventRepository.find();
    for (const event of events) {
      if (event.startDate.split('T')[0] === data.startDate.split('T')[0]) {
        throw new HttpException('Date already has an event assigned', HttpStatus.CONFLICT);
      }
    }
    const user = await this.userService.whoAmI(userId);
    const newEvent = await this.eventRepository.create({ ...data, owner: user });
    await this.eventRepository.save(newEvent);
    return this.toResponseObject(newEvent);
  }

  async update(id: string, userId: string, data: Partial<EventDTO>) {
    let event = await this.eventRepository.findOne({
      where: { id },
      relations: ['owner'],
    });

    if (!event) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    this.ensureOwnership(event, userId);
    await this.eventRepository.update(id, data);

    event = await this.eventRepository.findOne({
      where: { id },
      relations: ['owner'],
    });
    return this.toResponseObject(event);
  }

  async remove(id: string, userId: string) {
    const event = await this.eventRepository.findOne({
      where: { id },
      relations: ['owner'],
    });

    if (!event) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    this.ensureOwnership(event, userId);
    await this.eventRepository.delete(id);
    return this.toResponseObject(event);
  }
}
