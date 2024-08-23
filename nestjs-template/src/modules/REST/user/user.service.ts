import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'prisma/prisma.service';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class UserService {

  constructor(private readonly prisma: PrismaService, private jwt: JwtService) { }


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

  findOneByUsername(username: string) {

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
    try {
      const user = await this.prisma.users.findFirst({
        where: {
          email
        }
      })

      if (!user) {
        throw new Error('User or password is invalid');
      }

      const isSamePassword = bcrypt.compare(password, user.password);

      if (!isSamePassword) {
        throw new Error('User or password is invalid');
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

      const posts = await this.prisma.posts.findMany({
        where: {
          id_user: id_user,
        },
      });

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
    
      const posts = await this.prisma.posts.findMany({
        where: {
          id_user: id_user,
        },
      });
    
      const user = await this.prisma.users.findUnique({
        where: {
          id_user: id_user,
        },
      });
    
      if (!user) throw new Error('User not found');
    
      const isFollowing = await this.prisma.followers.findFirst({
        where: {
          id_user_follow: id_user,
          id_user_request: id_user_visitor,
          state: "ACCEPTED",
        },
      });
    
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
}