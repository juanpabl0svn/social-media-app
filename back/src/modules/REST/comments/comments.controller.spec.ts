import { Test, TestingModule } from '@nestjs/testing';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

describe('CommentsController', () => {
  let controller: CommentsController;
  let prismaservice: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentsController],
      providers: [CommentsService, PrismaService],
    }).compile();

    controller = module.get<CommentsController>(CommentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
