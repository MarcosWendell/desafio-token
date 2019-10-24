import { APP_INTERCEPTOR } from '@nestjs/core';
import { Module } from '@nestjs/common';

import { DatabaseModule } from './database.module';
import { eventProviders } from '../provider/event.provider';
import { EventController } from '../controller/event.controller';
import { EventService } from './../provider/event.service';
import { userProviders } from '../provider/user.provider';
import { UserInterceptor } from './../shared/user.interceptor';

@Module({
  imports: [DatabaseModule],
  controllers: [EventController],
  providers: [...eventProviders, ...userProviders, EventService],
})
export class EventModule {}
