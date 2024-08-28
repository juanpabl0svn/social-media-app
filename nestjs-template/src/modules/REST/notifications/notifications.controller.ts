import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}


  @Get(':id')
  getNotifications(@Param('id') id: string) {
    return this.notificationsService.getNotifications(+id);
  }

  @Post('/accept_follow')
  acceptFollow(@Body() body: { id_follow: number }) {
    if (!body.id_follow) {
      throw new HttpException('id_follow is required', 400);
    }
    return this.notificationsService.acceptFollow(body.id_follow);
  }

  @Post('/reject_follow')
  rejectFollow(@Body() body: { id_follow: number }) {
    if (!body.id_follow) {
      throw new HttpException('id_follow is required', 400);
    }
    return this.notificationsService.rejectFollow(body.id_follow);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNotificationDto: UpdateNotificationDto) {
    return this.notificationsService.update(+id, updateNotificationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationsService.remove(+id);
  }
}
