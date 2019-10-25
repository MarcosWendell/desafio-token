import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  UseGuards,
  Delete,
  Param,
} from '@nestjs/common';

import { ValidationPipe } from './../shared/validation.pipe';
import { UserDTO } from './../asset/user.dto';
import { UserService } from '../provider/user.service';
import { AuthGuard } from '../shared/auth.guard';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('api/users')
  @UseGuards(new AuthGuard())
  showAllUsers() {
    return this.userService.showAll();
  }

  @Delete('api/users/:id')
  @UseGuards(new AuthGuard())
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }

  @Post('auth/login')
  @UsePipes(new ValidationPipe())
  login(@Body() data: UserDTO) {
    return this.userService.login(data);
  }

  @Post('auth/register')
  @UsePipes(new ValidationPipe())
  register(@Body() data: UserDTO) {
    return this.userService.register(data);
  }
}
