import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NotificationsIcon from "@mui/icons-material/Notifications";

type AlarmProps = {
  isSidebarOpen: boolean;
  onLogout: () => void;
};

const Alarm: React.FC<AlarmProps> = ({ isSidebarOpen, onLogout }) => {
  const [notifications, setNotifications] = useState<string[]>([]);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);

  const showNotification = (message: string) => {
    setNotifications([...notifications, message]);
    setIsNotificationVisible(true);
  };

  const hideNotification = () => {
    setIsNotificationVisible(false);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    const notificationText = document.querySelector('.notification-text');
    if (notificationText && !notificationText.contains(event.target as Node)) {
      hideNotification();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      handleOutsideClick(event);
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <AlarmButton>
      <NotificationsIcon
        sx={{ width: 30, height: 30 }}
        onClick={() => showNotification('새로운 알림이 있습니다!')}
      />
      {isNotificationVisible && (
        <NotificationContainer className="notification-text">
          {notifications.map((message, index) => (
            <div key={index}>{message}</div>
          ))}
        </NotificationContainer>
      )}
    </AlarmButton>
  );
};

const AlarmButton = styled.div`
  position: relative;
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 24px;
  cursor: pointer;
`;

const NotificationContainer = styled.div`
  max-width: 200px;
  position: absolute;
  background: white;
  color: #0074e4;
  padding: 5px;
  border-radius: 5px;
  top: 35px;
  right: 0;
  white-space: nowrap;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export default Alarm;
