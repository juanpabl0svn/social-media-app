import { Injectable, HttpException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service'; 
import { FirebaseService } from 'firebase/firebase.service';
import * as crypto from 'crypto';

@Injectable()
export class PostsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly firebaseService: FirebaseService,
  ) {}

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
}
