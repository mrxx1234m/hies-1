import { Module } from '@nestjs/common';
import { AuthorizationController } from './authorization.controller';
import { AuthorizationService } from './authorization.service';
import { DatabaseModule } from 'src/core/database/database.module';
import { AuthModule } from 'src/auth/auth.module';
import { GoogleStrategy } from './google.stategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [AuthorizationController],
  providers: [AuthorizationService,GoogleStrategy],
  imports:[DatabaseModule,AuthModule,PassportModule]
})
export class AuthorizationModule {}
