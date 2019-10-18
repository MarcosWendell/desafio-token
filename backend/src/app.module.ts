import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UserModule } from './module/user.module';
import { EventModule } from './module/event.module';
import { LoggingInterceptor } from './shared/logging.interceptor';
import { HttpExceptionFilter } from './shared/http-exception.filter';

@Module({
  imports: [
    UserModule,
    EventModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    AppService,
  ],
})
export class AppModule {}
