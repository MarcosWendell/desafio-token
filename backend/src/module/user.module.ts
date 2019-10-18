import { Module } from '@nestjs/common';

import { DatabaseModule } from './database.module';
import { userProviders } from '../provider/user.provider';
import { UserController } from '../controller/user.controller';
import { UserService } from '../provider/user.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [...userProviders, UserService],
})
export class UserModule {}
