import { HttpException, Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class LikesService {

  constructor(private prisma: PrismaService) { }

  async create(createLikeDto: CreateLikeDto) {
    try {
      await this.prisma.likes.create({
        data: createLikeDto
      })

      await this.prisma.posts.update({
        where: {
          id_post: createLikeDto.id_post
        },
        data: {
          likes_count: {
            increment: 1
          }
        }
      })

    } catch (e) {
      throw new HttpException(e.message, 401)
    }
  }

  async remove(id_post: number, id_like: number) {

    try {
      await this.prisma.posts.update({
        where: {
          id_post
        },
        data: {
          likes_count: {
            decrement: 1
          }
        }
      })

      await this.prisma.posts.update({
        where: {
          id_post
        },
        data: {
          likes_count: {
            decrement: 1
          }
        }

      })

    }
    catch (e) {
      throw new HttpException(e.message, 401)
    }

  }
}
