import { Controller, Get, Put, Delete, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor() {}

  @Get('')
  findAllUsers() {}

  @Get(':id')
  findUser() {}

  @Post('create')
  createUser() {}

  @Put(':id/update')
  updateUser() {}

  @Delete(':id/delete')
  removeUser() {}
}
