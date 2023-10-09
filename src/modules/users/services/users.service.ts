import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  private logger = new Logger('UsersService');

  async create(userDto: CreateUserDto): Promise<User | null> {
    const firstName = userDto.fullName.split(' ')[0];
    const user: User = {
      ...userDto,
      id: uuidv4(),
      firstName,
      isActive: false,
    };

    const alreadyRegisteredUser = await this.usersRepository.findBy({
      email: userDto.email,
    });

    if (alreadyRegisteredUser) {
      throw new HttpException(
        'Already Registered User!',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.usersRepository.create(user);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
