import React, { createContext, ReactNode, useContext, useState } from "react";
import { AnimationDuration } from "../components/Notifications/Notification/styles";

interface INotification {
  text: string;
  status: "animating" | "default";
  id: number;
}

interface IContext {
  addNotification: (text: string, duration?: number) => void;
  notifications: INotification[];
}

const NotificationsContext = createContext(null as unknown as IContext);

export const NotificationsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [notifications, setNotifications] = useState<INotification[]>([]);

  const addNotification = (text: string, duration: number = 1000) => {
    const id = notifications[notifications.length - 1]?.id + 1 || 0;
    const newNotification: INotification = {
      text,
      status: "default",
      id,
    };

    setNotifications([...notifications, newNotification]);

    // Run animation after given time
    setTimeout(() => {
      setNotifications((notifications) => {
        const notificationsCopy = [...notifications];
        for (let i = 0; i < notificationsCopy.length; i++) {
          if (notificationsCopy[i].id === id) {
            notificationsCopy[i].status = "animating";
            break;
          }
        }
        return notificationsCopy;
      });
    }, duration);

    // Clear notification after animation
    setTimeout(() => {
      setNotifications((notifications) =>
        notifications.filter((notification) => notification.id !== id)
      );
    }, duration + parseInt(AnimationDuration));
  };

  return (
    <NotificationsContext.Provider value={{ addNotification, notifications }}>
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationsContext);
