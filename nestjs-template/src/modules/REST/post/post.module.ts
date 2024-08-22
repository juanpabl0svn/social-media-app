import { Module } from '@nestjs/common';
import { PostsService } from './post.service';
import { PostsController } from './post.controller';
import { PrismaService } from 'prisma/prisma.service';
import { FirebaseService } from 'firebase/firebase.service';

@Module({
  controllers: [PostsController],
  providers: [PostsService, PrismaService, FirebaseService],
})
export class PostModule {}
