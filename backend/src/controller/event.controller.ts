import { Controller, Get, Post, Param, Delete, Put, Body } from '@nestjs/common';

import { EventService } from '../provider/event.service';
import { EventDTO } from '../shared/event.dto';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  showAllEvents() {
    return this.eventService.showAll();
  }

  @Get(':id')
  find(@Param('id') id: string) {
    return this.eventService.find(id);
  }

  @Post('create')
  createEvent(@Body() data: EventDTO) {
    return this.eventService.create(data);
  }

  @Put(':id/update')
  updateEvent(@Param('id') id: string, @Body() data: Partial<EventDTO>) {
    return this.eventService.update(id, data);
  }

  @Delete(':id/delete')
  removeEvent(@Param('id') id: string) {
    return this.eventService.remove(id);
  }
}
