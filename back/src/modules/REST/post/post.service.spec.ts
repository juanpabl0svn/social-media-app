import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './post.service';
import { PrismaService } from 'prisma/prisma.service';
import { FirebaseService } from '_firebase/firebase.service';
import { ConfigService } from '@nestjs/config';

describe('PostService', () => {
  let service: PostsService;
  let prisma: PrismaService;
  let firebase: FirebaseService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostsService, PrismaService, FirebaseService, ConfigService],
    }).compile();

    service = module.get<PostsService>(PostsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(()=>{
    prisma.$disconnect()
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should exists posts', async () => {

    const result = await service.getPosts(1);

    expect(result.length).toBeGreaterThan(0)
  }, 10000)

  it('should change the state of a post', async () => {

    const result = await service.changeState(1, false);

    expect(result).toBeTruthy()
  }
    , 10000)

  it('should delete a post', async () => {
    jest.spyOn(prisma.posts, 'delete').mockImplementation()

    await service.deletePost(1);

    expect(prisma.posts.delete).toHaveBeenCalled()
  })


  it("should delete a post test", async () => {

    jest.spyOn(prisma.posts, 'findFirst').mockResolvedValue({
      id_comment: 1
    } as any)

    jest.spyOn(prisma.posts, 'delete').mockResolvedValue(null)

    const result = await service.deletePost(1);

    expect(result).toBeFalsy()

  })
});
