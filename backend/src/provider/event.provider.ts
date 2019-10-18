import { Connection, Repository } from 'typeorm';

import { EventEntity } from './../entity/event.entity';
import { EVENT_REPOSITORY, DATABASE_CONNECTION } from '../asset/constants';

export const eventProviders = [
  {
    provide: EVENT_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(EventEntity),
    inject: [DATABASE_CONNECTION],
  },
];
