import { USER_REPOSITORY } from './../asset/constants';
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';

import { EVENT_REPOSITORY } from '../asset/constants';
import { EventEntity } from './../entity/event.entity';
import { EventDTO, EventRO } from '../asset/event.dto';
import { UserEntity } from '../entity/user.entity';
import { isDeclaration } from '@babel/types';

@Injectable()
export class EventService {
  constructor(
    @Inject(EVENT_REPOSITORY)
    private readonly eventRepository: Repository<EventEntity>,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  private toResponseObject(event: EventEntity): EventRO {
    return { ...event, owner: event.owner.toResponseObject() };
  }

  private ensureOwnership(event: EventEntity, userId: string) {
    if (event.owner.id !== userId) {
      throw new HttpException('Incorrect user', HttpStatus.UNAUTHORIZED);
    }
  }

  async showAll(): Promise<EventRO[]> {
    const events = await this.eventRepository.find({ relations: ['owner'] });
    return events.map(event => this.toResponseObject(event));
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
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const event = await this.eventRepository.create({ ...data, owner: user });
    await this.eventRepository.save(event);
    return this.toResponseObject(event);
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
