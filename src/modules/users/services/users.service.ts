import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { Repository, UpdateResult } from 'typeorm';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../entities/user.entity';

const saltOrRounds = 10;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  private logger = new Logger('UsersService');

  async create(userDto: CreateUserDto): Promise<void> {
    const { fullName, email, password } = userDto;

    const alreadyRegisteredUser = await this.usersRepository.findOneBy({
      email: userDto.email,
    });

    if (alreadyRegisteredUser) {
      throw new HttpException(
        'Already Registered User!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const firstName = fullName.split(' ')[0];
    const hash = await bcrypt.hash(password, saltOrRounds);

    const user: User = {
      id: uuidv4(),
      firstName,
      fullName,
      email,
      hash,
      isActive: false,
    };

    const created = this.usersRepository.create(user);
    this.usersRepository.save(created);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  update(id: string, user: Partial<User>): Promise<UpdateResult | null> {
    return this.usersRepository.update({ id }, user);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
