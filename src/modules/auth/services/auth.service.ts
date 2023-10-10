import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/modules/users/services/users.service';
import { RegisterDto } from '../dtos/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  signUp(registerDto: RegisterDto): Promise<void> {
    return this.usersService.create(registerDto);
  }

  async signIn(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new HttpException('User does not exist.', HttpStatus.FORBIDDEN);
    }

    const isMatch = await bcrypt.compare(password, user.hash);
    if (!isMatch) {
      throw new HttpException('Incorrect password.', HttpStatus.UNAUTHORIZED);
    }

    const { id, firstName, fullName } = user;
    const access_token = await this.jwtService.signAsync(
      {
        sub: id,
        firstName,
        fullName,
        email,
      },
      { secret: process.env.SECRET },
    );

    return { access_token };
  }
}
