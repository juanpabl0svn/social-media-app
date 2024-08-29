import { Controller, Post, UploadedFile, UseInterceptors, Body, Get, Delete, Patch, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express'; 
import { PostsService } from './post.service';

@Controller('post')
export class PostsController {

    constructor(private postService: PostsService){}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createPost(
    @UploadedFile() file: Express.Multer.File,
    @Body('description') description: string,
    @Body('id_user') id_user: string,
  ) {
    return this.postService.createPost({ id_user: +id_user, image: file, description });
  }

  @Get(':id_user')
  async getPosts(@Param('id_user') id_user: string) {
    return this.postService.getPosts(+id_user);
  }

  @Delete('/delete')
  async deletePost(@Body('id_post') id_post: string) {
    return this.postService.deletePost(+id_post);
  }

  @Patch('/change_state/:id_post')
  async changeState(@Param('id_post') id_post: string, @Body('state') state: boolean) {
    return this.postService.changeState(+id_post, state);
  }

}
