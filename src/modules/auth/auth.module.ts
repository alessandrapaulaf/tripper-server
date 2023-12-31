import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppConfig } from 'src/config/constants.config';
import { UsersModule } from '../users/users.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';

const JwtModuleRegistered = JwtModule.register({
  global: true,
  secret: AppConfig.jwtSecret,
  signOptions: { expiresIn: '2d' },
});

@Module({
  imports: [JwtModuleRegistered, UsersModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
