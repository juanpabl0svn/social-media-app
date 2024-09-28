import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './post.service';
import { PrismaService } from 'prisma/prisma.service';
import { FirebaseService } from '_firebase/firebase.service';
import { ConfigService } from '@nestjs/config';



describe('PostService', () => {
  let service: PostsService;
  let prisma: PrismaService;
  let firebase: FirebaseService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostsService, PrismaService, FirebaseService, ConfigService],
    }).compile();

    service = module.get<PostsService>(PostsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
