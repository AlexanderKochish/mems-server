import { Module } from '@nestjs/common';
import { MemsModule } from './mems/mems.module';

@Module({
  imports: [MemsModule],
})
export class AppModule {}
