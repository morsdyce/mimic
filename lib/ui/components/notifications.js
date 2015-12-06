import React, { Component } from 'react';
import { Dispatcher } from 'ui/dispatcher/dispatcher';
import { NOTIFICATION_EVENTS } from 'ui/constants/notifications';
import NotificationSystem from 'react-notification-system';

export class Notifications extends Component {

  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;

    this._registerHandlers();
  }

  componentWillUnmount() {
    this._removeListeners();
  }

  _registerHandlers() {
    Dispatcher.on(NOTIFICATION_EVENTS.CREATE, this._createNotification, this);
  }

  _removeListeners() {
    Dispatcher.removeListener(NOTIFICATION_EVENTS.CREATE, this._createNotification, this);
  }

  _createNotification(notification) {
    return this._notificationSystem.addNotification(notification);
  }

  render() {
    return <NotificationSystem ref="notificationSystem"/>;
  }
}