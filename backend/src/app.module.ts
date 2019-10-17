import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UserModule } from './module/user.module';
import { EventModule } from './module/event.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    EventModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
  ],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
