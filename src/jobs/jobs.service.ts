import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { CreatedJobsDto } from './dto/created-jobs.dto';

@Injectable()
export class JobsService {
    constructor(private readonly prisma:PrismaService){}
    async createJob(body:CreatedJobsDto){}
    
}
