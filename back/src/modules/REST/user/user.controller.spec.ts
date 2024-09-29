import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from 'prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { HttpException } from '@nestjs/common';
import LoginDto from './dto/login.dto';
import { validate } from 'class-validator';
import { CreateUserDto } from './dto/create-user.dto';

describe('UserController', () => {
  let controller: UserController;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, PrismaService, JwtService],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should not login user for wrong credentials', async () => {
    const userData = new LoginDto().factory({
      email: 'juan@gmail.com',
      password: '1234567'
    });



    const result = controller.login(userData);

    await expect(result).rejects.toThrow(new HttpException('User or password is invalid', 401));
  });

  it('should login user', async () => {

    const userData = new LoginDto().factory({
      email: 'juan@gmail.com',
      password: '1234567890'
    });

    expect(await controller.login(userData)).toHaveProperty('token');

  })

  it('should login no sensitive case', async () => {

    const userData = new LoginDto().factory({
      email: 'jUaN@gmaIl.com',
      password: '1234567890'
    });


    expect(await controller.login(userData)).toHaveProperty('token');

  }, 10000)

  it('should say email not valid', async () => {
    const userData = new CreateUserDto().factory(
      {
        email: 'juan',
        password: '1234567890',
        username: 'juanpas',
        first_name: 'juan',
        last_name: 'perez',
        birth_date: new Date('1999-09-09')
      }
    );

    const errors = await validate(userData)

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints?.isEmail).toBe('Invalid email');
  },10000)

  it('should say password not valid', async () => {
    const userData = new CreateUserDto().factory(
      {
        email: 'juanpsi@gmail.com',
        password: '1230',
        username: 'juanpas',
        first_name: 'juan',
        last_name: 'perez',
        birth_date: new Date('1999-09-09')
      }
    );

    const errors = await validate(userData)

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints?.minLength).toBe('Password must be at least 8 characters');

  });

  it('should bring my information', async () => {

    const user = {
      "followers": 1,
      "following": 1,
      "posts": [
        {
          "id_post": 1,
          "id_user": 1,
          "image_url": "https://firebasestorage.googleapis.com/v0/b/instapic-4be91.appspot.com/o/posts%2F6bd5c1a4-9681-416b-9f03-fa44d5ee1407?alt=media&token=348ceb0f-89bf-4450-b9ae-35a2b9e36ef0",
          "created_at": "2024-08-22T00:44:23.529Z",
          "description": "",
          "public": true,
          "likes_count": 13,
          "likes": [
            {
              "id_like": 137,
              "id_user": 1,
              "id_post": 1,
              "like_date": "2024-09-29T03:03:37.418Z"
            }
          ],
          "likedByUser": true
        },
        {
          "id_post": 2,
          "id_user": 1,
          "image_url": "https://firebasestorage.googleapis.com/v0/b/instapic-4be91.appspot.com/o/posts%2F41c364d0-b30d-4ab3-b7ea-9bcfddf730bc?alt=media&token=56726e02-064c-4fa0-b6cd-47fd6c30fa5b",
          "created_at": "2024-08-22T00:52:20.731Z",
          "description": "",
          "public": true,
          "likes_count": 1,
          "likes": [],
          "likedByUser": false
        },
        {
          "id_post": 7,
          "id_user": 1,
          "image_url": "https://firebasestorage.googleapis.com/v0/b/instapic-4be91.appspot.com/o/posts%2F929c2bb4-60f6-4a54-b6ea-fc533e0a2c21?alt=media&token=20fa7999-ec29-477d-b32f-7b1c542da26f",
          "created_at": "2024-08-23T04:57:58.573Z",
          "description": "",
          "public": true,
          "likes_count": 5,
          "likes": [
            {
              "id_like": 3,
              "id_user": 1,
              "id_post": 7,
              "like_date": "2024-08-24T23:16:31.321Z"
            }
          ],
          "likedByUser": true
        },
        {
          "id_post": 32,
          "id_user": 1,
          "image_url": "https://firebasestorage.googleapis.com/v0/b/instapic-4be91.appspot.com/o/posts%2F906e36c5-89fb-4dd2-a35e-b1f8064e26a1?alt=media&token=e27651f7-64be-4d68-8a64-29f1e64909e2",
          "created_at": "2024-09-05T04:51:48.522Z",
          "description": "",
          "public": true,
          "likes_count": 1,
          "likes": [],
          "likedByUser": false
        },
        {
          "id_post": 33,
          "id_user": 1,
          "image_url": "https://firebasestorage.googleapis.com/v0/b/instapic-4be91.appspot.com/o/posts%2F6afd87e0-308a-4fd8-81e4-2848dd81b605?alt=media&token=8c8f0dd2-3db6-485e-933a-c9deae63c436",
          "created_at": "2024-09-05T04:51:52.664Z",
          "description": "",
          "public": true,
          "likes_count": 1,
          "likes": [],
          "likedByUser": false
        }
      ]
    }


    const result = await controller.getInfo('1');

    expect(result.followers).toBe(user.followers);
    expect(result.following).toBe(user.following);
    expect(result.posts.length).toBe(user.posts.length);


  }, 10000)

});
