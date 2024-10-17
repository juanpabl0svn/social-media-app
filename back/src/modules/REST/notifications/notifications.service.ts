import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class NotificationsService {

  constructor(private readonly prisma: PrismaService) { }


  getNotifications(id_user: number) {
    return this.prisma.notifications.findMany({
      where: {
        id_user
      },
      orderBy: {
        created_at: 'desc'
      }
    })
  }

  async rejectFollow(id_follow: number, id_notification: number) {

    const notification = await this.prisma.notifications.findFirst({
      where: {
        id_notification 
      },
      select: {
        data: true
      }
    });


    if (!notification) {
      throw new HttpException('Notification not found', 404);
    }

    const existingData = notification.data as any; 
    const updatedData = {
      ...existingData,
      state: 'REJECTED'
    };

    await this.prisma.notifications.update({
      where: {
        id_notification
      },
      data: {
        data: updatedData
      }
    });


    return this.prisma.followers.delete({
      where: {
        id_follow
      }
    })
  }


  async acceptFollow(id_follow: number, id_notification: number) {

    const notification = await this.prisma.notifications.findUnique({
      where: {
        id_notification
      },
      select: {
        data: true
      }
    });


    if (!notification) {
      throw new HttpException('Notification not found', 404);
    }

    const existingData = notification.data as any; 
    const updatedData = {
      ...existingData,
      state: 'ACCEPTED'
    };

    await this.prisma.notifications.update({
      where: {
        id_notification
      },
      data: {
        data: updatedData
      },
    });

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
