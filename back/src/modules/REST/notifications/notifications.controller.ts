import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { ApiTags } from '@nestjs/swagger';
import { FollowDto } from './dto/follow.dto';

@ApiTags('Notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}


  @Get(':id')
  getNotifications(@Param('id') id: string) {
    return this.notificationsService.getNotifications(+id);
  }

  @Post('/accept_follow')
  acceptFollow(@Body() body: FollowDto) {
    return this.notificationsService.acceptFollow(+body.id_follow, +body.id_notification);
  }

  @Post('/reject_follow')
  rejectFollow(@Body() body: FollowDto) {
    return this.notificationsService.rejectFollow(+body.id_follow, +body.id_notification);
  }
}
