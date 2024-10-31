import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './post.service';
import { PrismaService } from 'prisma/prisma.service';
import { FirebaseService } from '_firebase/firebase.service';
import { ConfigService } from '@nestjs/config';
import { HttpException } from '@nestjs/common';

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

  afterEach(() => {
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

  it('should throw an error if image upload fails', async () => {
    const data = {
      id_user: 1,
      image: {} as Express.Multer.File,
      description: 'Descripción de prueba',
    };

    // Mock para forzar un error en uploadFile
    jest.spyOn(firebase, 'uploadFile').mockRejectedValue(new Error('Error al subir imagen'));

    // Llama al método y espera que lance una excepción
    await expect(service.createPost(data)).rejects.toThrow(
      new HttpException('Error uploading image or creating post', 500),
    );
  });

  it('should throw an error if post creation fails', async () => {
    const data = {
      id_user: 1,
      image: {} as Express.Multer.File,
      description: 'Descripción de prueba',
    };
    const imageUrl = 'https://fakeurl.com/image.jpg';

    // Mock para la subida de imagen correcta
    jest.spyOn(firebase, 'uploadFile').mockResolvedValue(imageUrl);

    // Mock para forzar un error en la creación del post
    jest.spyOn(prisma.posts, 'create').mockRejectedValue(new Error('Error al crear post'));

    await expect(service.createPost(data)).rejects.toThrow(
      new HttpException('Error uploading image or creating post', 500),
    );
  });


  it("delete post test", async () => {

    jest.spyOn(prisma.posts, 'findFirst').mockResolvedValue({ id_post: 1, created_at: new Date() } as any)

    jest.spyOn(prisma.posts, 'delete').mockResolvedValue({ id_post: 1, created_at: new Date() } as any)

    await service.deletePostTest();

    expect(prisma.posts.delete).toHaveBeenCalled();

  })
});
