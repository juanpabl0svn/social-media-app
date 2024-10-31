import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @ApiParam({
    name: 'id',
    required: true,
    description: 'id of the post',
  })
  @Get(':id')
  findComments(@Param('id') id: string) {
    return this.commentsService.getComments(+id);
  }

  @Delete("/delete/test")
  deleteCommentTest() {
    return this.commentsService.deleteCommentTest()
  }

}
