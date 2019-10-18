import { Module } from '@nestjs/common';

import { DatabaseModule } from './database.module';
import { eventProviders } from '../provider/event.provider';
import { EventController } from '../controller/event.controller';
import { EventService } from './../provider/event.service';

@Module({
  imports: [DatabaseModule],
  controllers: [EventController],
  providers: [...eventProviders, EventService],
})
export class EventModule {}
