import React from "react";
import { useNotifications } from "../../contexts/notificationsContext";
import { NotificationsContainer } from "./styles";
import Notification from "./Notification/index";

const Notifications = () => {
  const { notifications } = useNotifications();

  return (
    <NotificationsContainer>
      {notifications.map((notification) => (
        <Notification
          animating={notification.status === "animating"}
          key={notification.id}
        >
          {notification.text}
        </Notification>
      ))}
    </NotificationsContainer>
  );
};

export default Notifications;
