import { Test, TestingModule } from '@nestjs/testing';
import { LikesController } from './likes.controller';
import { LikesService } from './likes.service';
import { PrismaService } from 'prisma/prisma.service';

describe('LikesController', () => {
  let controller: LikesController;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LikesController],
      providers: [LikesService, PrismaService],
    }).compile();

    controller = module.get<LikesController>(LikesController);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should like the post', async () => {

    const likeData = {
      id_user: 1,
      id_post: 1,
      like: true
    };


    jest.spyOn(prisma.likes, 'create')

    await controller.create(likeData);

    expect(prisma.likes.create).toHaveBeenCalled()

  })

  it('should dislike the post', async () => {

    const likeData = {
      id_user: 1,
      id_post: 1,
      like: false
    };


    jest.spyOn(prisma.likes, 'delete')

    await controller.create(likeData);

    expect(prisma.likes.delete).toHaveBeenCalled()

  })
});
