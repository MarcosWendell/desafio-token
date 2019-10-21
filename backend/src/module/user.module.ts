import { Module } from '@nestjs/common';

import { DatabaseModule } from './database.module';
import { userProviders } from '../provider/user.provider';
import { UserController } from '../controller/user.controller';
import { UserService } from '../provider/user.service';
import { eventProviders } from './../provider/event.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [...userProviders, ...eventProviders, UserService],
})
export class UserModule {}
