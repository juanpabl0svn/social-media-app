import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class CommentsService {


  constructor(private prisma: PrismaService) { }


  create(createCommentDto: CreateCommentDto) {
    return this.prisma.comments.create({
      data: createCommentDto
    })
  }

  getComments(id_post: number) {
    return this.prisma.comments.findMany({
      include: {
        users: true
      },
      where: {
        id_post
      }
    })
  }

}
