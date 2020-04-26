"use strict"
export default {
  setNotificationSystem(notificationSystem) {
    this.notificationSystem = notificationSystem;
  },
  notifySuccess(options = {}) {
    this.notificationSystem.addNotification(Object.assign({}, {
      title: "Success",
      level: 'success'
    }, options));
  },

  notifyError(options = {}) {
    options = Object.assign({
      message: "Something went wrong please try again later!"
    }, options);
    this.notificationSystem.addNotification(Object.assign({}, {
      title: "Error",
      level: 'error'
    }, options));
  },

  notifyInfo(options = {}) {
    this.notificationSystem.addNotification(Object.assign({}, {
      title: "info",
      level: 'info'
    }, options));
  },
  notifyWarning(options = {}) {
    this.notificationSystem.addNotification(Object.assign({}, {
      title: "warning",
      level: 'warning'
    }, options));
  }
}
