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
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of comments', async () => {
    jest.spyOn(prisma.comments, 'findMany').mockResolvedValue([]);
    expect(await controller.findComments('-1')).toEqual([]);
  })

  it('should return an array of comments', async () => {
    const comments = [
      {
        "id_comment": 9,
        "id_user": 1,
        "id_post": 1,
        "comment": "Bonito post!",
        "created_at": new Date("2024-09-29T01:22:50.127Z"),
        "users": {
          "id_user": 1,
          "username": "juanpas",
          "first_name": "Juan Pablo",
          "last_name": "Sanchez",
          "email": "juanpablo@yconsultores.com"
        }
      }
    ]

    const result = await controller.findComments('1');

    expect(result.length).toEqual(comments.length)
    expect(result[0].id_comment).toEqual(comments[0].id_comment)

  })

  it('should create a comment', async () => {
    const comment = {
      "id_user": 1,
      "id_post": 2,
      "comment": "Bonito post!"
    }

    jest.spyOn(controller, 'create')

    await controller.create(comment)

    expect(controller.create).toHaveBeenCalled()


  },10000)
});
