import { Injectable, HttpException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { FirebaseService } from '_firebase/firebase.service';
import * as crypto from 'crypto';

@Injectable()
export class PostsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly firebaseService: FirebaseService,
  ) { }

  async createPost(data: { id_user: number; image: Express.Multer.File; description: string }) {
    const { id_user, image, description } = data;

    try {
      const image_url = await this.firebaseService.uploadFile(image, 'posts', crypto.randomUUID());

      const post = await this.prisma.posts.create({
        data: {
          id_user,
          description,
          image_url,
        },
      });

      return post;
    } catch (error) {
      console.error(error);
      throw new HttpException('Error uploading image or creating post', 500);
    }
  }

  async getPosts(id_user: number) {
    const postsWithUserAndLikes = await this.prisma.posts.findMany({
      include: {
        likes: {
          where: {
            id_user: id_user, // Filtramos los likes por el id_user
          },
        },
        users: true, // Incluimos la información del usuario que creó el post
      },
      where: {
        public: true, // Filtrar solo los posts públicos
      },
      orderBy: {
        created_at: 'desc', // Ordenar por la fecha de creación
      },
    });
  
    const postsWithLikedStatus = postsWithUserAndLikes.map(post => ({
      ...post,
      likedByUser: post.likes.length > 0, // Si el usuario ha dado like, `likedByUser` será true
    }));
  
    return postsWithLikedStatus;
  }
  



  async deletePost(id_post: number) {
    return this.prisma.posts.delete({
      where: {
        id_post,
      },
    });
  }

  async changeState(id_post: number, state: boolean) {
    return this.prisma.posts.update({
      data: {
        public: state,
      },
      where: {
        id_post,
      },
    });
  }

}
