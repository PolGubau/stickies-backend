import { Module } from '@nestjs/common';
import { TagStickyController } from './tag-sticky.controller';
import { TagStickyService } from './tag-sticky.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [TagStickyController],
  providers: [TagStickyService],
  imports: [PrismaModule],
})
export class TagStickyModule {}
