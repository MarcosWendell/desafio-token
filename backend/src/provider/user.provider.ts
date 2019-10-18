import { Connection, Repository } from 'typeorm';

import { UserEntity } from './../entity/user.entity';
import { USER_REPOSITORY, DATABASE_CONNECTION } from '../asset/constants';

export const userProviders = [
  {
    provide: USER_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(UserEntity),
    inject: [DATABASE_CONNECTION],
  },
];