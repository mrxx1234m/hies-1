import { Module } from '@nestjs/common';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import { DatabaseModule } from 'src/core/database/database.module';

@Module({
  controllers: [JobsController],
  providers: [JobsService],
  imports:[DatabaseModule]
})
export class JobsModule {}
