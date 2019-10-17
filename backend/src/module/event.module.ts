import { Module } from '@nestjs/common';

import { DatabaseModule } from './database.module';
import { eventProviders } from '../provider/event.provider';

@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [],
  providers: [...eventProviders],
})
export class EventModule {}
