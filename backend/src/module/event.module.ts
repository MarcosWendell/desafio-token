import { Module } from '@nestjs/common';

import { DatabaseModule } from './database.module';
import { eventProviders } from '../provider/event.provider';
import { EventController } from '../controller/event.controller';
import { EventService } from './../provider/event.service';
import { userProviders } from '../provider/user.provider';
import { UserService } from '../provider/user.service';

@Module({
  imports: [DatabaseModule],
  controllers: [EventController],
  providers: [...eventProviders, ...userProviders, EventService, UserService],
})
export class EventModule {}
