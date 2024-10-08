import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/rest/user/user.module';
import { PostModule } from './modules/rest/post/post.module';
import { NotificationsModule } from './modules/rest/notifications/notifications.module';
import { CommentsModule } from './modules/rest/comments/comments.module';
import { LikesModule } from './modules/rest/likes/likes.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env'
  }),
    UserModule, PostModule, NotificationsModule, CommentsModule, LikesModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
