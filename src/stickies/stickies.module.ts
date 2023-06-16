import { Module } from '@nestjs/common';
import { StickyService } from './stickies.service';
import { StickiesController } from './stickies.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [StickiesController],
  providers: [StickyService],
  imports: [PrismaModule],
})
export class StickiesModule {}
