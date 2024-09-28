import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './post.controller';
import { PostsService } from './post.service';
import { PrismaService } from 'prisma/prisma.service';

describe('PostController', () => {
  let controller: PostsController;
  let prisma: PrismaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [PostsService, PrismaService],
    }).compile();

    controller = module.get<PostsController>(PostsController);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
