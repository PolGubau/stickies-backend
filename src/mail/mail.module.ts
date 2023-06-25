import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailServiceController } from './mail.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [MailService],
  controllers: [MailServiceController],
  exports: [MailService],
  imports: [PrismaModule],
})
export class MailModule {}
