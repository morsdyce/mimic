import { Dispatcher } from 'ui/dispatcher/dispatcher';
import { NOTIFICATION_EVENTS } from 'ui/constants/notifications';

export class NotificationActions {

  static createSimple({ title, message, type = 'success', position = 'tr'}) {
    Dispatcher.emit(NOTIFICATION_EVENTS.CREATE, {
      title,
      message,
      level: type,
      position
    });
  }

  static create(notification) {
    Dispatcher.emit(NOTIFICATION_EVENTS.CREATE, notification);
  }

}
