import { Test, TestingModule } from '@nestjs/testing';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { PrismaService } from 'prisma/prisma.service';

describe('CommentsController', () => {
  let controller: CommentsController;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentsController],
      providers: [CommentsService, PrismaService],
    }).compile();

    controller = module.get<CommentsController>(CommentsController);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    prisma.$disconnect()
  })

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should not return an array of comments', async () => {
    jest.spyOn(prisma.comments, 'findMany').mockResolvedValue([]);
    expect(await controller.findComments('-1')).toEqual([]);
  })

  it('should return an array of comments', async () => {
    const comments = [
      {
        "id_comment": 2,
        "id_user": 1,
        "id_post": 2,
        "comment": "asdfsd",
        "created_at": "2024-08-28T22:50:25.696Z",
        "users": {
          "id_user": 1,
          "username": "juanpas",
          "first_name": "Juan Pablo",
          "last_name": "Sanchez",
          "email": "juan@gmail.com"
        }
      }
    ]

    const result = await controller.findComments('2');

    expect(result.length).toBeGreaterThan(0)
    expect(result[0].id_comment).toEqual(comments[0].id_comment)

  }, 10000)

  it('should create a comment', async () => {
    const comment = {
      "id_user": 1,
      "id_post": 2,
      "comment": "Bonito post!"
    }

    jest.spyOn(controller, 'create')

    await controller.create(comment)

    expect(controller.create).toHaveBeenCalled()


  }, 10000)
});
