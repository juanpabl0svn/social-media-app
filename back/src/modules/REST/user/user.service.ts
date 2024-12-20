import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'prisma/prisma.service';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class UserService {

  constructor(private readonly prisma: PrismaService, private readonly jwt: JwtService) { }


  async verify(token: string) {
    try {
      const { id_user } = this.jwt.verify(token, {
        secret: process.env.JWT_SECRET ?? ''
      })

      return await this.prisma.users.findUnique({
        where: {
          id_user
        }
      })

    } catch (e) {
      throw new HttpException(e.message, 401)
    }
  }

  findByUsername(username: string) {

    if (username.trim().length == 0) return [];


    return this.prisma.users.findMany({
      where: {
        username: {
          startsWith: username
        }
      }
    })
  }

  async register(createUserDto: CreateUserDto) {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.username = createUserDto.username.toLowerCase();
    createUserDto.email = createUserDto.email.toLowerCase();
    createUserDto.last_name = createUserDto.last_name.toLowerCase();
    createUserDto.first_name = createUserDto.first_name.toLowerCase();
    const user = await this.prisma.users.create({
      data: createUserDto
    });

    const token = this.jwt.sign({
      id_user: user.id_user,
      email: user.email,
      username: user.username
    }, {
      secret: process.env.JWT_SECRET ?? '',
      expiresIn: '1d'
    });

    const { password: _, ...userWithoutPassword } = user;

    return {
      token,
      ...userWithoutPassword

    }

  }

  async login(email: string, password: string) {
    email = email.toLowerCase();
    try {
      const user = await this.prisma.users.findFirst({
        where: {
          email
        }
      })

      if (!user) {
        throw new HttpException('User or password is invalid', 401);
      }

      const isSamePassword = await bcrypt.compare(password, user.password);

      if (!isSamePassword) {
        throw new HttpException('User or password is invalid', 401);
      }

      const token = this.jwt.sign({
        id_user: user.id_user,
        email: user.email,
        username: user.username
      }, {
        secret: process.env.JWT_SECRET ?? '',
        expiresIn: '1d'
      });

      const { password: _, ...userWithoutPassword } = user;

      return {
        token,
        ...userWithoutPassword
      }
    } catch (e) {
      throw new HttpException(e.message, 401)
    }
  }

  async update(id_user: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.prisma.users.findFirst({
        where: {
          id_user
        }
      })

      if (updateUserDto.password != user.password) {
        updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
      } else {
        updateUserDto.password = user.password;
      }

      return await this.prisma.users.update({
        where: {
          id_user
        },
        data: updateUserDto
      })
    } catch (e) {
      throw new HttpException(e.message, 401)
    }
  }

  async remove(id_user: number) {
    return await this.prisma.users.delete({
      where: {
        id_user
      }
    })
  }


  async me(id_user: number) {
    try {
      const followers = await this.prisma.followers.findMany({
        where: {
          id_user_follow: id_user,
          state: "ACCEPTED",
        },
      });

      const following = await this.prisma.followers.findMany({
        where: {
          id_user_request: id_user,
          state: "ACCEPTED",
        },
      });

      let posts = await this.prisma.posts.findMany({
        include: {
          likes: {
            where: {
              id_user: id_user,
            },
          },
        },
        where: {
          id_user
        },
        orderBy: {
          created_at: 'asc',
        },
      });

      posts = posts.map(post => ({
        ...post,
        likedByUser: post.likes.length > 0,
      })
      );

      return {
        followers: followers.length,
        following: following.length,
        posts,
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  }


  async infoUser(id_user: number, id_user_visitor: number) {
    try {
      const followers = await this.prisma.followers.findMany({
        where: {
          id_user_follow: id_user,
          state: "ACCEPTED",
        },
      });

      const following = await this.prisma.followers.findMany({
        where: {
          id_user_request: id_user,
          state: "ACCEPTED",
        },
      });

      let posts = await this.prisma.posts.findMany({
        include: {
          likes: {
            where: {
              id_user: id_user,
            },
          },
          users: true,
        },
        where: {
          public: true,
          id_user
        },
        orderBy: {
          created_at: 'asc',
        },
      });

      const user = await this.prisma.users.findUnique({
        where: {
          id_user: id_user,
        },
      });

      if (!user) throw new HttpException('User not found', 401);

      const isFollowing = await this.prisma.followers.findFirst({
        where: {
          id_user_follow: id_user,
          id_user_request: id_user_visitor,
        },
      });


      posts = posts.map(post => ({
        ...post,
        likedByUser: post.likes.length > 0,
      }))

      return {
        followers: followers.length,
        following: following.length,
        posts,
        isFollowing,
        ...user,
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async follow(id_user: number, id_user_follower: number) {

    try {

      const user = await this.prisma.users.findFirst({
        where: {
          id_user: id_user_follower
        }
      })

      if (!user) throw new HttpException('User not found', 401);

      const alreadyFollow = await this.prisma.followers.findFirst({
        where: {
          id_user_follow: id_user,
          id_user_request: id_user_follower
        }
      })

      if (alreadyFollow) throw new HttpException('Already follow', 401);


      const follow = await this.prisma.followers.create({
        data: {
          id_user_follow: id_user,
          id_user_request: id_user_follower,
        }
      })


      await this.prisma.notifications.create({
        data: {
          id_user,
          data: {
            id_user: id_user_follower,
            username: user.username,
            message: `${user.username} quiere seguirte`,
            id_follow: follow.id_follow,
          },
          type: 'FOLLOW',
        }
      })


      return 'follow request'

    } catch (e) {
      throw new HttpException(e.message, 401)
    }
  }


  async unfollow(id_user: number, id_user_follower: number) {

    try {

      const user = await this.prisma.users.findFirst({
        where: {
          id_user: id_user_follower
        }
      })

      if (!user) throw new HttpException('User not found', 401);

      const follow = await this.prisma.followers.findFirst({
        where: {
          id_user_follow: id_user,
          id_user_request: id_user_follower,
        }
      })

      if (!follow) throw new HttpException('Follow not found', 401);

      await this.prisma.followers.delete({
        where: {
          id_follow: follow.id_follow
        }
      })



      const hasNotification = await this.prisma.notifications.findFirst({
        where: {
          id_user,
          type: 'FOLLOW',
          data: {
            path: ['id_user'],
            equals: id_user_follower,
          }
        }
      })

      if (hasNotification) {
        await this.prisma.notifications.delete({
          where: {
            id_notification: hasNotification.id_notification
          }
        })
      }

      return 'unfollow'

    } catch (e) {
      throw new HttpException(e.message, 401)
    }
  }


  async deleteUserTest() {
    const user = await this.prisma.users.findFirst({
      orderBy: {
        id_user: 'desc',
      }
    })

    return this.prisma.users.delete({
      where: {
        id_user: user.id_user,
      },
    });


  }
}
