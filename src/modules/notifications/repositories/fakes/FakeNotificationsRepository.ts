// import { v4 as uuidv4 } from 'uuid';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';

import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';

export default class FakeNotificationsRepository
  implements INotificationsRepository {
  private notifications: Notification[] = [];

  public async create({
    recipient_id,
    content,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = new Notification();

    Object.assign(notification, { recipient_id, content } as Notification);

    this.notifications.push(notification);

    return notification;
  }
}
