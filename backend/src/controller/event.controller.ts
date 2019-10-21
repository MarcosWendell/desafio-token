import { Controller, Get, Post, Param, Delete, Put, Body, UsePipes, UseGuards } from '@nestjs/common';

import { EventService } from '../provider/event.service';
import { EventDTO } from '../asset/event.dto';
import { AuthGuard } from '../shared/auth.guard';
import { ValidationPipe } from './../shared/validation.pipe';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  @UseGuards(new AuthGuard())
  showAllEvents() {
    return this.eventService.showAll();
  }

  @Get(':id')
  @UseGuards(new AuthGuard())
  find(@Param('id') id: string) {
    return this.eventService.find(id);
  }

  @Post('create')
  @UsePipes(new ValidationPipe())
  @UseGuards(new AuthGuard())
  createEvent(@Body() data: EventDTO) {
    return this.eventService.create(data);
  }

  @Put(':id/update')
  @UsePipes(new ValidationPipe())
  @UseGuards(new AuthGuard())
  updateEvent(@Param('id') id: string, @Body() data: Partial<EventDTO>) {
    return this.eventService.update(id, data);
  }

  @Delete(':id/delete')
  @UseGuards(new AuthGuard())
  removeEvent(@Param('id') id: string) {
    return this.eventService.remove(id);
  }
}
