import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { UserEntity } from '../entity/user.entity';
import { USER_REPOSITORY } from './../shared/constants';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
}
