import { Test, TestingModule } from '@nestjs/testing';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
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

  it('should return an array of comments', async () => {
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

  // it('should create a comment', async () => {
  //   const comment = {
  //     "id_user": 1,
  //     "id_post": 2,
  //     "comment": "Bonito post!"
  //   }

  //   const result = await controller.create(comment)


  //   expect(result.id_post).toEqual(comment.id_post)

  // },10000)
});
