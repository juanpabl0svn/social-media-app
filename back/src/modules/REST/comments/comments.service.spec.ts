import { Test, TestingModule } from '@nestjs/testing';
import { CommentsService } from './comments.service';
import { PrismaService } from 'prisma/prisma.service';

describe('CommentsService', () => {
  let service: CommentsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentsService, PrismaService],
    }).compile();

    service = module.get<CommentsService>(CommentsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should show an empty array', async () => {
    const comments = await service.getComments(-1);
    expect(comments).toEqual([]);
  })

  it('should show an array with one comment', async () => {

    const comments = [
      {
        "id_comment": 9,
        "id_user": 1,
        "id_post": 1,
        "comment": "Bonito post!",
        "created_at": "2024-09-29T01:22:50.127Z",
        "users": {
          "id_user": 1,
          "username": "juanpas",
          "first_name": "Juan Pablo",
          "last_name": "Sanchez",
          "email": "juanpablo@yconsultores.com"
        }
      }
    ]

    const result = await service.getComments(1);
    expect(result.length).toEqual(comments.length);
    expect(result[0].id_comment).toEqual(comments[0].id_comment);

  })

  it('should create a comment', async () => {
    const comment = {
      "id_user": 1,
      "id_post": 2,
      "comment": "Bonito post!"
    }

    const result = await service.create(comment)

    expect(result.id_post).toEqual(comment.id_post)

  })
});
