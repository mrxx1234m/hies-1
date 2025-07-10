import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [],
  providers: [AuthService],
  imports:[ JwtModule.register({
    secret: process.env.JWT_SECRET || 'default_secret',
    signOptions: { expiresIn: '1d' },
  }),],
  exports:[AuthService]
})
export class AuthModule {}
