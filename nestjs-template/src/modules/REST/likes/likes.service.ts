import { HttpException, Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class LikesService {

  constructor(private prisma: PrismaService) { }

  async create(createLikeDto: CreateLikeDto) {
    try {

      if (createLikeDto.like) {

        await this.prisma.likes.create({
          data: {
            id_post: createLikeDto.id_post,
            id_user: createLikeDto.id_user
          }
        })

        const user_post_owner = await this.prisma.posts.findUnique({
          where: {
            id_post: createLikeDto.id_post
          },
          select: {
            id_user: true,
            users: true
          }
        })

        const hasNotification = await this.prisma.notifications.findFirst({
          where: {
            id_user: user_post_owner.id_user,
            type: 'LIKE',
            data: {
              path: ['id_user', 'id_post'],
              equals: [createLikeDto.id_user, createLikeDto.id_post]
            }

          }
        })

        if (!hasNotification) {
          const user = await this.prisma.users.findUnique({
            where: {
              id_user: createLikeDto.id_user
            },
            select: {
              username: true
            }
          })

          if (user_post_owner.id_user !== createLikeDto.id_user) {
            await this.prisma.notifications.create({
              data: {
                id_user: user_post_owner.id_user,
                type: 'LIKE',
                data: {
                  id_user: createLikeDto.id_user,
                  id_post: createLikeDto.id_post,
                  username: user_post_owner.users.username,
                  message: `${user.username} le ha dado like a tu publicación`
                }
              }
            })
          }
        }
      } else {

        const like = await this.prisma.likes.findFirst({
          where: {
            id_post: createLikeDto.id_post,
            id_user: createLikeDto.id_user
          }
        })

        await this.prisma.likes.delete({
          where: {
            id_like: like.id_like
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
