import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsService } from './notifications.service';
import { PrismaService } from 'prisma/prisma.service';
import { HttpException } from '@nestjs/common';
import exp from 'constants';

describe('NotificationsService', () => {
  let service: NotificationsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotificationsService, PrismaService],
    }).compile();

    service = module.get<NotificationsService>(NotificationsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(()=>{
    prisma.$disconnect()
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should show no notifications', async () => {
    jest.spyOn(prisma.notifications, 'findMany').mockReturnValue(Promise.resolve([]) as any)
    const result = await service.getNotifications(0);
    expect(result).toEqual([]);
  }, 10000)

  it('should show several notifications', async () => {

    const notifications = [
      {
        "id_notification": 92,
        "id_user": 1,
        "type": "LIKE",
        "data": {
          "id_post": 32,
          "id_user": 7,
          "message": "juanPee le ha dado like a tu publicación",
          "username": "juanpas"
        },
        "created_at": "2024-09-17T21:04:20.880Z"
      },
      {
        "id_notification": 54,
        "id_user": 1,
        "type": "FOLLOW",
        "data": {
          "id_user": 11,
          "message": "1 quiere seguirte",
          "username": "1",
          "id_follow": 58
        },
        "created_at": "2024-09-10T16:27:12.351Z"
      },
      {
        "id_notification": 53,
        "id_user": 1,
        "type": "FOLLOW",
        "data": {
          "id_user": 11,
          "message": "1 quiere seguirte",
          "username": "1",
          "id_follow": 57
        },
        "created_at": "2024-09-10T16:27:11.388Z"
      },
      {
        "id_notification": 52,
        "id_user": 1,
        "type": "FOLLOW",
        "data": {
          "id_user": 11,
          "message": "1 quiere seguirte",
          "username": "1",
          "id_follow": 56
        },
        "created_at": "2024-09-10T16:27:11.102Z"
      },
      {
        "id_notification": 37,
        "id_user": 1,
        "type": "COMMENT",
        "data": {
          "id_post": 32,
          "id_user": 11,
          "message": "juanpas ha comentado tu publicación"
        },
        "created_at": "2024-09-10T16:21:15.099Z"
      },
      {
        "id_notification": 33,
        "id_user": 1,
        "type": "LIKE",
        "data": {
          "id_post": 33,
          "id_user": 9,
          "message": "hackerman le ha dado like a tu publicación",
          "username": "juanpas"
        },
        "created_at": "2024-09-10T03:32:47.056Z"
      },
      {
        "id_notification": 32,
        "id_user": 1,
        "type": "LIKE",
        "data": {
          "id_post": 33,
          "id_user": 9,
          "message": "hackerman le ha dado like a tu publicación",
          "username": "juanpas"
        },
        "created_at": "2024-09-10T03:32:46.033Z"
      },
      {
        "id_notification": 15,
        "id_user": 1,
        "type": "LIKE",
        "data": {
          "id_post": 7,
          "id_user": 8,
          "message": "mgomez le ha dado like a tu publicación",
          "username": "juanpa"
        },
        "created_at": "2024-09-05T03:29:31.312Z"
      },
      {
        "id_notification": 11,
        "id_user": 1,
        "type": "LIKE",
        "data": {
          "id_post": 7,
          "id_user": 5,
          "message": "santixzz| le ha dado like a tu publicación",
          "username": "juanpa"
        },
        "created_at": "2024-09-05T01:34:29.632Z"
      },
      {
        "id_notification": 9,
        "id_user": 1,
        "type": "COMMENT",
        "data": {
          "id_post": 2,
          "id_user": 1,
          "message": "juanpa ha comentado tu publicación"
        },
        "created_at": "2024-08-28T22:52:38.816Z"
      },
      {
        "id_notification": 8,
        "id_user": 1,
        "type": "COMMENT",
        "data": {
          "id_post": 2,
          "id_user": 1,
          "message": "juanpa ha comentado tu publicación"
        },
        "created_at": "2024-08-28T22:50:25.287Z"
      },
      {
        "id_notification": 7,
        "id_user": 1,
        "type": "LIKE",
        "data": {
          "id_post": 7,
          "id_user": 4,
          "message": "luigi le ha dado like a tu publicación",
          "username": "juanpa"
        },
        "created_at": "2024-08-28T13:43:46.829Z"
      },
      {
        "id_notification": 6,
        "id_user": 1,
        "type": "FOLLOW",
        "data": {
          "state": "ACCEPTED",
          "id_user": 4,
          "message": "luigi quiere seguirte",
          "username": "luigi",
          "id_follow": 9
        },
        "created_at": "2024-08-28T13:43:38.338Z"
      }
    ]
    const result = await service.getNotifications(1);

    expect(result.length).toEqual(notifications.length);


  }, 10000)

  it('should not reject a follow', async () => {

    const id_follow = 9;
    const id_notification = 6;

    jest.spyOn(prisma.notifications, 'findFirst').mockResolvedValue(null as any);

    const result = service.rejectFollow(id_follow, id_notification);

    await expect(result).rejects.toThrow(new HttpException('Notification not found', 404));

  })

  it('should not accept a follow', async () => {

    const id_follow = 9;
    const id_notification = 6;

    jest.spyOn(prisma.notifications, 'findFirst').mockResolvedValue(null as any);

    const result = service.rejectFollow(id_follow, id_notification);

    await expect(result).rejects.toThrow(new HttpException('Notification not found', 404));
  }, 10000)

  it('reject follow fails because notification not found', async () => {

    const data = {
      id_follow: -10,
      id_notification: 1
    }

    const result = service.rejectFollow(data.id_follow, data.id_notification)

    await expect(result).rejects.toThrow(new HttpException('Notification not found', 404))

  })

  it('accept follow fails because notification not found', async () => {

    const data = {
      id_follow: -10,
      id_notification: 1
    }

    const result = service.acceptFollow(data.id_follow, data.id_notification)

    await expect(result).rejects.toThrow(new HttpException('Notification not found', 404))

  })

  it('should accept follow', async () => {

    const data = {
      id_follow: 1,
      id_notification: 1
    }

    jest.spyOn(prisma.notifications, 'findUnique').mockResolvedValue({ id_notification: 1, id_user: 1, type: 'FOLLOW', data: {}, created_at: new Date() })
    jest.spyOn(prisma.notifications, 'update').mockImplementation()
    jest.spyOn(prisma.followers, 'update').mockImplementation()

    const result = await service.acceptFollow(data.id_follow, data.id_notification)


    expect(prisma.notifications.findUnique).toHaveBeenCalled()
    expect(prisma.notifications.update).toHaveBeenCalled()
    expect(prisma.followers.update).toHaveBeenCalled()

  })


});
