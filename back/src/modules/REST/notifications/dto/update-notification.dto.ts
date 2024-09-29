import { PartialType } from '@nestjs/swagger';
import { FollowDto } from './follow.dto';

export class UpdateNotificationDto extends PartialType(FollowDto) {}
