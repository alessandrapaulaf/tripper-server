import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';
import { LoginDto } from '../dtos/login.dto';
import { RegisterDto } from '../dtos/register.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(@Body(new ValidationPipe()) signInDto: LoginDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  signUp(@Body(new ValidationPipe()) registerDto: RegisterDto) {
    return this.authService.signUp(registerDto);
  }
}
