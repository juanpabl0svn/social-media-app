import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from 'prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { HttpException } from '@nestjs/common';
import LoginDto from './dto/login.dto';
import { validate } from 'class-validator';
import { CreateUserDto } from './dto/create-user.dto';
import { last } from 'rxjs';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UserController', () => {
  let controller: UserController;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, PrismaService, JwtService],
    }).compile();

    controller = module.get<UserController>(UserController);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    prisma.$disconnect()
  })

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
  }, 10000)

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
      "followers": 0,
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

    expect(result.followers).toEqual(user.followers);
    expect(result.following).toEqual(user.following);
    expect(result.posts.length).toEqual(user.posts.length);


  }, 10000)


  it('should verify user', async () => {

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoxfQ.JSAW5p7sk2shnMNHrAy6voWR0UDCNTy555Ze9R85G9M'

    const result = await controller.verify({ token });

    expect(result).toHaveProperty('id_user');

  })

  it('should not verify user', async () => {

    const token = 'eyJhbG'

    const result = controller.verify({ token });

    await expect(result).rejects.toThrow(new HttpException('jwt malformed', 401));

  });

  it('should update user', async () => {

    const user = new UpdateUserDto()



    user.email = 'adsf@gmail.com',
      user.username = 'juanpas',
      user.password = '1234567890',
      user.first_name = 'juan',
      user.last_name = 'perez',
      user.birth_date = new Date('1999-09-09')

    jest.spyOn(prisma.users, 'update').mockResolvedValue({ id_user: 1, created_at: new Date(), ...user } as any);

    const result = await controller.update('1', user);

    expect(result).toHaveProperty('id_user');

  }, 10000)

  it('should find by username', async () => {
    const username = 'juanpas'

    const result = await controller.findByUsername(username);

    expect(result.length).toBeGreaterThan(0);

  }, 10000)

  it('should not find by username empty', async () => {
    const username = ''

    const result = await controller.findByUsername(username);

    expect(result.length).toEqual(0);
  })

  it('should not login with random user', async () => {

    const userData = new LoginDto().factory({
      email: '2342432faffwwqeriugidshfueyrqu@gmail.com',
      password: '123455654345654'
    })

    const result = controller.login(userData);

    await expect(result).rejects.toThrow(new HttpException('User or password is invalid', 401));

  });


  it('should bring person info', async () => {

    const info = {
      id_user: 1,
      id_user_visitor: 2

    }

    const result = await controller.getUserFollow(info);

    expect(result).toHaveProperty('id_user');


  })


  it('should register user', async () => {

    const userData = new CreateUserDto()


    userData.email = 'adsf@gmail.com',
      userData.password = '1234567890',
      userData.username = 'juanpas',
      userData.first_name = 'juan',
      userData.last_name = 'perez',
      userData.birth_date = new Date('1999-09-09')



    jest.spyOn(prisma.users, 'create').mockResolvedValue({ id_user: 1, created_at: new Date(), ...userData });


    const result = await controller.register(userData);

    expect(result).toHaveProperty('token');
    expect(prisma.users.create).toHaveBeenCalled();

  })



})

