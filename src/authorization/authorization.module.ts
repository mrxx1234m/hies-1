import { Module } from '@nestjs/common';
import { AuthorizationController } from './authorization.controller';
import { AuthorizationService } from './authorization.service';
import { DatabaseModule } from 'src/core/database/database.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [AuthorizationController],
  providers: [AuthorizationService],
  imports:[DatabaseModule,AuthModule]
})
export class AuthorizationModule {}
