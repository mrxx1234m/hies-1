import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { DatabaseModule } from 'src/core/database/database.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
  imports:[DatabaseModule,AuthModule]
})
export class CategoryModule {}
