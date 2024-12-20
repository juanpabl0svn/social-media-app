import { HttpException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PrismaService } from 'prisma/prisma.service';



@Injectable()
export class CommentsService {


  constructor(private readonly prisma: PrismaService) { }


  async create(createCommentDto: CreateCommentDto) {
    try {
      const user_post_owner = await this.prisma.posts.findUnique({
        where: {
          id_post: createCommentDto.id_post
        },
        select: {
          id_user: true,
          users: true
        }
      })

      if (user_post_owner.id_user !== createCommentDto.id_user) {

        await this.prisma.notifications.create({
          data: {
            type: 'COMMENT',
            id_user: user_post_owner.id_user,
            data: {
              id_user: createCommentDto.id_user,
              id_post: createCommentDto.id_post,
              message: `${user_post_owner.users.username} ha comentado tu publicación`
            }
          }
        })

      }

      return this.prisma.comments.create({
        data: createCommentDto
      })

    } catch (e) {
      throw new HttpException(e.message, 400)
    }

  }

  getComments(id_post: number) {
    return this.prisma.comments.findMany({
      include: {
        users: {
          select: {
            "id_user": true,
            "username": true,
            "first_name": true,
            "last_name": true,
            "email": true,
          }
        }
      },
      where: {
        id_post
      }
    })
  }

  async deleteCommentTest() {

    const comment = await this.prisma.comments.findFirst({
      orderBy: {
        id_post: 'desc',
      },
    });

    return this.prisma.comments.delete({
      where: {
        id_comment: comment.id_comment,
      },
    })
  }

}
