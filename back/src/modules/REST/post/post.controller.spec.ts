import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './post.controller';
import { PostsService } from './post.service';
import { PrismaService } from 'prisma/prisma.service';
import { FirebaseService } from '_firebase/firebase.service';
import { ConfigService } from '@nestjs/config';

describe('PostController', () => {
  let controller: PostsController;
  let prisma: PrismaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [PostsService, PrismaService, FirebaseService, ConfigService],
    }).compile();

    controller = module.get<PostsController>(PostsController);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should exists posts', async () => {
    
  
      const result = await controller.getPosts('1');
  
      expect(result.length).toBeGreaterThan(0)
  },10000)

});
