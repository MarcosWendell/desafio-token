import { UserDTO, UserRO } from './../asset/user.dto';
import { Injectable, Inject, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';

import { UserEntity } from '../entity/user.entity';
import { USER_REPOSITORY } from '../asset/constants';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async showAll(): Promise<UserRO[]> {
    const users = await this.userRepository.find();
    return users.map( user => user.toResponseObject() );
  }

  async login(data: UserDTO): Promise<UserRO> {
    const { username, password } = data;
    const user = await this.userRepository.findOne({ where: {username}});
    if (!user || !(await user.comparePassword(password))) {
      throw new HttpException('Invalid username/password', HttpStatus.BAD_REQUEST);
    }
    return user.toResponseObject();
  }

  async register(data: UserDTO): Promise<UserRO> {
    const { username } = data;
    let user = await this.userRepository.findOne({ where: {username} });
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    Logger.log(`User: ${user}`);
    user = await this.userRepository.create(data);
    await this.userRepository.save(user);
    return user.toResponseObject();
  }
}
