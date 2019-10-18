import { ValidationPipe } from './../shared/validation.pipe';
import { UserDTO } from './../asset/user.dto';
import { Controller, Get, Put, Delete, Post, Body, UsePipes, Logger } from '@nestjs/common';
import { UserService } from '../provider/user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('api/users')
  showAllUsers() {
    return this.userService.showAll();
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  login(@Body() data: UserDTO) {
    return this.userService.login(data);
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  register(@Body() data: UserDTO) {
    return this.userService.register(data);
  }
}
