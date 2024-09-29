import { Test, TestingModule } from '@nestjs/testing';
import { LikesService } from './likes.service';
import { PrismaService } from 'prisma/prisma.service';

describe('LikesService', () => {
  let service: LikesService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LikesService, PrismaService],
    }).compile();

    service = module.get<LikesService>(LikesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should like the post', async () => {

    const likeData = {
      id_user: 1,
      id_post: 1,
      like: true
    };

    jest.spyOn(prisma.likes, 'create')

    await service.create(likeData);

    expect(prisma.likes.create).toHaveBeenCalled();

  })

  // it('should dislike the post', async () => {

  //   const likeData = {
  //     id_user: 1,
  //     id_post: 1,
  //     like: false
  //   };


  //   jest.spyOn(prisma.likes, 'delete')

  //   await service.create(likeData);

  //   expect(prisma.likes.delete).toHaveBeenCalled();


  // })
});
