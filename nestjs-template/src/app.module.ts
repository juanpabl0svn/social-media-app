import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ChatModule } from './modules/socket/chat/chat.module';
import { UserModule } from './modules/rest/user/user.module';
import { PostModule } from './modules/rest/post/post.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env'
  }),
    ChatModule, UserModule, PostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
