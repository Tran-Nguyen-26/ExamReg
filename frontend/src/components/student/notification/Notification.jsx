import React from 'react';
import { Bell, Calendar, Info } from 'lucide-react';
import './Style-Notification.css';

const Notification = () => {
  return (
    <div className="notification">
      <div className="notification-icon">
        <Bell className="bell-icon" />
      </div>
      <div className="notification-content">
        <h2>
          <Calendar className="inline-icon" />
          Đăng ký thi cuối học kì 1 năm học 2025-2026
        </h2>
        <p>
          <Info className="inline-icon" />
          Vui lòng chọn môn học để xem lịch thi và đăng ký
        </p>
      </div>
    </div>
  );
};

export default Notification;