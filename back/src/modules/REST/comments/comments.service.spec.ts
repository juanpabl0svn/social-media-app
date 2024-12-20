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

  afterEach(() => {
    prisma.$disconnect()
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should show an empty array', async () => {
    jest.spyOn(service, 'getComments').mockResolvedValue([]);
    const comments = await service.getComments(-1);
    expect(comments).toEqual([]);
  }, 10000)

  it('should return an specific comment', async () => {

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

    const result = await service.getComments(2);
    expect(result[0].id_comment).toEqual(comments[0].id_comment);

  }, 10000)

  it('should create a comment and a notification', async () => {
    const comment = {
      "id_user": 1,
      "id_post": 2,
      "comment": "Bonito post!"
    }

    jest.spyOn(prisma.posts, 'findUnique').mockResolvedValue({
      id_user: 1,
      id_post: 2,
      users: {
        username: 'juanpas'
      }
    } as any)
    jest.spyOn(prisma.notifications, 'create').mockImplementation()

    await service.create(comment)

    expect(prisma.posts.findUnique).toHaveBeenCalled()

    expect(prisma.posts.findUnique).toHaveBeenCalled()


  }, 10000)

  it('should create a comment and no notification', async () => {
    const comment = {
      "id_user": 1,
      "id_post": 1,
      "comment": "Bonito post!"
    }

    jest.spyOn(prisma.posts, 'findUnique')
    jest.spyOn(prisma.notifications, 'create')

    await service.create(comment)

    expect(prisma.posts.findUnique).toHaveBeenCalled()
    expect(prisma.notifications.create).not.toHaveBeenCalled()


  }, 10000)

  it("should delete comment test", async () => {

    jest.spyOn(prisma.comments, 'findFirst').mockResolvedValue({
      id_comment: 1
    } as any);

    jest.spyOn(prisma.comments, 'delete').mockResolvedValue(null);
    const result = await service.deleteCommentTest();

    expect(result).toEqual(null);
  })
});
