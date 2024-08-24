import { HttpException, Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class LikesService {

  constructor(private prisma: PrismaService) { }

  async create(createLikeDto: CreateLikeDto) {
    try {

      if (createLikeDto.like){
        await this.prisma.likes.create({
          data: {
            id_post: createLikeDto.id_post,
            id_user: createLikeDto.id_user
          }
        })

      }else{

        const like = await this.prisma.likes.findFirst({
          where: {
            id_post: createLikeDto.id_post,
            id_user: createLikeDto.id_user
          }
        })

        await this.prisma.likes.delete({
          where: {
            id_like : like.id_like
          }
        })
      }

      const type = createLikeDto.like ? 'increment' : 'decrement'

      await this.prisma.posts.update({
        where: {
          id_post: createLikeDto.id_post
        },
        data: {
          likes_count: {
            [type]: 1
          }
        }
      })

      return {
        message: 'Like updated'
      }

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
