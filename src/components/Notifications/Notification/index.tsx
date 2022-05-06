import React from "react";
import { NotificationContainer } from "./styles";

interface IProps {
  children: React.ReactNode;
  animating: boolean;
}

const Notification = ({ children, animating }: IProps) => {
  return (
    <NotificationContainer animating={animating}>
      {children}
    </NotificationContainer>
  );
};

export default Notification;
