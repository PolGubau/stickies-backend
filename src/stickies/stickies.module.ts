import { Module } from '@nestjs/common';
import { StickiesService } from './stickies.service';
import { StickiesController } from './stickies.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [StickiesController],
  providers: [StickiesService],
  imports: [PrismaModule],
})
export class StickiesModule {}
