import { HttpException, Injectable } from '@nestjs/common';
import { UpdateNotificationDto } from './dto/update-notification.dto';
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

    // Paso 1: Obtener el valor actual del campo JSON
    const notification = await this.prisma.notifications.findFirst({
      where: {
        id_notification // reemplaza con el ID real
      },
      select: {
        data: true
      }
    });

    // Paso 2: Asegurarse de que 'data' es un objeto o inicializarlo como tal

    if (!notification) {
      throw new HttpException('Notification not found', 404);
    }

    const existingData = notification.data as any; // Si 'data' es null o undefined, inicializarlo como un objeto vacío
    // Paso 3: Modificar el valor del campo JSON
    const updatedData = {
      ...existingData,
      state: 'REJECTED'
    };

    // Paso 4: Guardar el JSON actualizado
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

    // Paso 1: Obtener el valor actual del campo JSON
    const notification = await this.prisma.notifications.findUnique({
      where: {
        id_notification // reemplaza con el ID real
      },
      select: {
        data: true
      }
    });

    // Paso 2: Asegurarse de que 'data' es un objeto o inicializarlo como tal

    if (!notification) {
      throw new HttpException('Notification not found', 404);
    }

    const existingData = notification.data as any; // Si 'data' es null o undefined, inicializarlo como un objeto vacío
    // Paso 3: Modificar el valor del campo JSON
    const updatedData = {
      ...existingData,
      state: 'ACCEPTED'
    };

    // Paso 4: Guardar el JSON actualizado
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
