import 'reflect-metadata';
import { createConnection } from 'typeorm';

createConnection()
  // tslint:disable-next-line: no-console
  .then(() => console.log('Here you can setup and run express/koa/any other framework.') )
  // tslint:disable-next-line: no-console
  .catch(error => console.log(error));
