import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class NotificationsService {

  constructor(private prisma: PrismaService) { }


  create(createNotificationDto: CreateNotificationDto) {
    return 'This action adds a new notification';
  }

  findAll() {
    return `This action returns all notifications`;
  }

  getNotifications(id_user: number) {
    return this.prisma.notifications.findMany({
      where: {
        id_user
      }
    })
  }

  update(id: number, updateNotificationDto: UpdateNotificationDto) {
    return `This action updates a #${id} notification`;
  }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }

  rejectFollow(id_follow: number) {
    return this.prisma.followers.delete({
      where: {
        id_follow
      }
    })
  }


  acceptFollow(id_follow: number) {
    return this.prisma.followers.update({
      where: {
        id_follow
      },
      data: {
        state: 'ACCEPTED'
      }
    })
  }
}
