import { Controller, Post, UploadedFile, UseInterceptors, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express'; // Asegúrate de importar Express correctamente
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
}
