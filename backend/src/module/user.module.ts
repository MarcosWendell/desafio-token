import { Module } from '@nestjs/common';

import { DatabaseModule } from './database.module';
import { userProviders } from '../provider/user.provider';

@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [],
  providers: [...userProviders],
})
export class UserModule {}
