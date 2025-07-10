import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [CoreModule, AuthorizationModule, AuthModule,ConfigModule.forRoot({
    isGlobal: true, 
    envFilePath: '.env',
  }),UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
