import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { StickiesModule } from './stickies/stickies.module';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt/dist/jwt.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { MailerServiceModule } from './mailer-service/mailer-service.module';
import { TagsModule } from './tags/tags.module';
import { TagStickyModule } from './tag-sticky/tag-sticky.module';

// This is the app module, it is the root module.

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    StickiesModule,
    ConfigModule.forRoot({ isGlobal: true }),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    AuthModule,
    MailerServiceModule,
    TagsModule,
    TagsModule,
    TagStickyModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule {}
