import {
  Controller,
  Get,
  Post,
  Request,
  Param,
  Delete,
  Put,
  Body,
  UsePipes,
  UseGuards,
  UseInterceptors,
  Logger,
} from '@nestjs/common';

import { EventService } from '../provider/event.service';
import { EventDTO } from '../asset/event.dto';
import { DateCheckDTO } from './../asset/event.dto';
import { AuthGuard } from '../shared/auth.guard';
import { ValidationPipe } from './../shared/validation.pipe';
import { User } from '../asset/user.decorator';
import { UserInterceptor } from './../shared/user.interceptor';

@UseInterceptors(new UserInterceptor())
@UseGuards(new AuthGuard())
@Controller('api/events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get('')
  showAllEvents(@User('id') user: string) {
    return this.eventService.showAll(user);
  }

  @Get(':id')
  find(@Param('id') id: string) {
    return this.eventService.find(id);
  }

  @Post('checkDates')
  check(@Body() data: DateCheckDTO) {
    return this.eventService.check(data);
  }

  @Post('create')
  @UsePipes(new ValidationPipe())
  createEvent(@User('id') user: string, @Body() data: EventDTO) {
    return this.eventService.create(user, data);
  }

  @Put(':id/update')
  @UsePipes(new ValidationPipe())
  updateEvent(
    @Param('id') id: string,
    @User('id') user: string,
    @Body() data: Partial<EventDTO>,
  ) {
    return this.eventService.update(id, user, data);
  }

  @Delete(':id/delete')
  removeEvent(@Param('id') id: string, @User('id') user) {
    return this.eventService.remove(id, user);
  }
}
