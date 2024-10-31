import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from 'prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { validate } from 'class-validator';
import { CreateUserDto } from './dto/create-user.dto';
import LoginDto from './dto/login.dto';
import { HttpException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import e from 'express';

describe('UserService', () => {
  let service: UserService;
  let prisma: PrismaService;
  let jwt: JwtService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService, JwtService],
    }).compile();

    service = module.get<UserService>(UserService);
    prisma = module.get<PrismaService>(PrismaService);
    jwt = module.get<JwtService>(JwtService)
  });

  afterEach(() => {
    prisma.$disconnect()
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should not login user for wrong credentials', async () => {
    const userData = new LoginDto().factory({
      email: 'juan@gmail.com',
      password: '1234567'
    });



    const result = service.login(userData.email, userData.password);

    await expect(result).rejects.toThrow(new HttpException('User or password is invalid', 401));
  });

  it('should login user', async () => {

    const userData = new LoginDto().factory({
      email: 'juan@gmail.com',
      password: '1234567890'
    });

    jest.spyOn(prisma.users, 'findFirst')

    const user = await service.login(userData.email, userData.password)

    expect(user).toHaveProperty('token');
    expect(prisma.users.findFirst).toHaveBeenCalledWith({
      where: {
        email: userData.email
      }
    })

  }, 10000)

  it('should login no sensitive case', async () => {

    const userData = new LoginDto().factory({
      email: 'jUaN@gmaIl.com',
      password: '1234567890'
    });


    expect(await service.login(userData.email, userData.password)).toHaveProperty('token');

  }, 10000)



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


    const result = await service.me(1);

    expect(result.followers).toEqual(user.followers);
    expect(result.following).toEqual(user.following);
    expect(result.posts.length).toEqual(user.posts.length);


  }, 10000)


  it('should delete user', async () => {

    jest.spyOn(prisma.users, 'delete').mockResolvedValue({ id_user: 1, created_at: new Date() } as any)

    await service.remove(30);

    expect(prisma.users.delete).toHaveBeenCalled();
  })


  it('should not follow user', async () => {

    jest.spyOn(prisma.users, 'findFirst').mockResolvedValue(null)


    const result = service.follow(-1, -8);

    await expect(result).rejects.toThrow(new HttpException('User not found', 404));
  })

  it('should follow user', async () => {

    jest.spyOn(prisma.users, 'findFirst').mockResolvedValue({ id_user: 1, created_at: new Date() } as any)

    jest.spyOn(prisma.followers, 'create').mockResolvedValue({ id_follower: 1, created_at: new Date() } as any)

    const result = await service.follow(1, 2);

    expect(result).toHaveProperty('id_follower');

  })


  it("should unfollow user", async () => {

    jest.spyOn(prisma.users, 'findFirst').mockResolvedValue({ id_user: 1, created_at: new Date() } as any)

    jest.spyOn(prisma.followers, 'delete').mockResolvedValue({ id_follower: 1, created_at: new Date() } as any)

    const result = await service.unfollow(1, 2);

    expect(result).toHaveProperty('id_follower');
  })


  it("should delete user", async () => {
    jest.spyOn(prisma.users, 'delete').mockResolvedValue({ id_user: 1, created_at: new Date() } as any)

    await service.remove(1);

    expect(prisma.users.delete).toHaveBeenCalled();
  })

  it('should verify user', async () => {

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoxfQ.JSAW5p7sk2shnMNHrAy6voWR0UDCNTy555Ze9R85G9M'

    const result = await service.verify(token);

    expect(result).toHaveProperty('id_user');


  })

  it('should not verify user', async () => {

    //Arrange
    const token = 'eyJasdfsSdf12'


    //Act
    const result = service.verify(token);


    //Assert
    await expect(result).rejects.toThrow(new HttpException('jwt malformed', 401));
  })

  it('should update user', async () => {

    //Arrange
    const user = new UpdateUserDto()



    user.email = 'adsf@gmail.com',
      user.username = 'juanpas',
      user.password = '1234567890',
      user.first_name = 'juan',
      user.last_name = 'perez',
      user.birth_date = new Date('1999-09-09')

    jest.spyOn(prisma.users, 'update').mockResolvedValue({ id_user: 1, created_at: new Date(), ...user } as any);

    //Act

    const result = await service.update(1, user);


    //Assert
    expect(result).toHaveProperty('id_user');

  }, 10000)

  it('should find by username', async () => {

    //Arrange
    const username = 'juanpas'

    //Act
    const result = await service.findByUsername(username);

    //Assert
    expect(result.length).toBeGreaterThan(0);

  }, 10000)

  it('should register', async () => {

    //Arrange
    const user = {
      username: 'pepegrillo',
      password: 'daS#@Dtw3^643',
      email: 'pepe@gmail.com',
      first_name: 'pepe',
      last_name: 'grillo',
      birth_date: new Date(),
      factory() { return new CreateUserDto() }
    }


    jest.spyOn(prisma.users, 'create').mockResolvedValue({ id_user: 1, created_at: new Date(), ...user })

    jest.spyOn(jwt, 'sign')



    //Act
    const result = await service.register(user)


    //Assert
    expect(result).toHaveProperty('token')
    expect(jwt.sign).toHaveBeenCalled()

  })


  it('should return info user', async () => {

    const data = {
      id_user: 1,
      id_visitor: 1

    }

    const result = await service.infoUser(data.id_user, data.id_visitor)


    expect(result).toHaveProperty('isFollowing')
    expect(result.isFollowing).toBeFalsy()

  })


});
