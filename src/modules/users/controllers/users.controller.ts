import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../models/create-user.dto';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() crateUserDto: CreateUserDto) {
    const user = {
      ...crateUserDto,
      id: Math.floor(Math.random() * 100),
      isActive: true,
    };
    return this.usersService.create(user);
  }
}
