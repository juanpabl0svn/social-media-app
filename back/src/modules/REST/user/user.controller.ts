import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import LoginDto from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) { }

  @Get('/me/:id_user')
  getInfo(@Param('id_user') id_user: string) {
    return this.userService.me(+id_user);
  }

  @Post('/user_data')
  getUserFollow(@Body() body: { id_user: number, id_user_visitor: number }) {
    return this.userService.infoUser(+body.id_user, +body.id_user_visitor);
  }

  @Post('/register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

  @Post('/login')
  login(@Body() body: LoginDto) {
    return this.userService.login(body.email, body.password);
  }

  @Post('/verify')
  verify(@Body() body: { token: string }) {
    return this.userService.verify(body.token);
  }

  @Get(':username')
  findByUsername(@Param('username') username: string) {
    return this.userService.findByUsername(username);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.userService.deleteUser(+id);
  }


  @Post('/follow')
  
  follow(@Body() body: { id_user: number, id_user_follower: number }) {
    return this.userService.follow(+body.id_user, +body.id_user_follower);
  }

  @Post('/unfollow')
  unfollow(@Body() body: { id_user: number, id_user_follower: number }) {
    return this.userService.unfollow(+body.id_user, +body.id_user_follower);
  }




  
}
