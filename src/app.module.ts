import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
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
import { MailModule } from './mail/mail.module';
import { TagsModule } from './tags/tags.module';
import { TagStickyModule } from './tag-sticky/tag-sticky.module';
import { isAuthenticated } from './app.middleware';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { MailServiceController } from './mail/mail.controller';
import { StickiesController } from './stickies/stickies.controller';
import { TagsController } from './tags/tags.controller';
import { TagStickyController } from './tag-sticky/tag-sticky.controller';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

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
    TagsModule,
    TagsModule,
    TagStickyModule,
    MailModule,
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'public'),
    // }),
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService, UsersService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(isAuthenticated)
      .exclude(
        { path: 'auth/login', method: RequestMethod.POST }, // Exclude POST /users/login
        { path: 'auth/signup', method: RequestMethod.POST }, // Exclude POST /users/register
      )
      .forRoutes(
        UsersController,
        AuthController,
        TagStickyController,
        TagsController,
        StickiesController,
        MailServiceController,
      );
  }
}
