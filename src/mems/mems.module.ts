import { Module } from '@nestjs/common';
import { MemsService } from './mems.service';
import { MemsController } from './mems.controller';
import { PrismaModule } from 'src/services/prisma.module';

@Module({
  controllers: [MemsController],
  providers: [MemsService],
  imports: [PrismaModule],
})
export class MemsModule {}
