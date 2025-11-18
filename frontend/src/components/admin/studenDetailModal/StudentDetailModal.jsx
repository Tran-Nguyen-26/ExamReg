import React from 'react';
import { IoIosClose } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import { HiMiniComputerDesktop } from "react-icons/hi2";
import  './Style-StudentDetailModal.css';

const StudentDetailModal = ({ student, onClose }) => {
  // Dữ liệu mẫu lịch thi đã đăng ký
  const registeredExams = [
    {
      id: 1,
      name: 'Cơ sở dữ liệu',
      code: 'IT4001',
      date: '15/11/2025',
      time: '08:00-09:30',
      room: 'P101-GĐ1',
      status: 'registered'
    },
    {
      id: 2,
      name: 'Cơ sở dữ liệu',
      code: 'IT4001',
      date: '15/11/2025',
      time: '08:00-09:30',
      room: 'P101-GĐ1',
      status: 'registered'
    },
    {
      id: 3,
      name: 'Cơ sở dữ liệu',
      code: 'IT4001',
      date: '15/11/2025',
      time: '08:00-09:30',
      room: 'P101-GĐ1',
      status: 'registered'
    },
    // {
    //   id: 4,
    //   name: 'Cơ sở dữ liệu',
    //   code: 'IT4001',
    //   date: '15/11/2025',
    //   time: '08:00-09:30',
    //   room: 'P101-GĐ1',
    //   status: 'registered'
    // },
    // {
    //   id: 5,
    //   name: 'Cơ sở dữ liệu',
    //   code: 'IT4001',
    //   date: '15/11/2025',
    //   time: '08:00-09:30',
    //   room: 'P101-GĐ1',
    //   status: 'registered'
    // },
    // {
    //   id: 6,
    //   name: 'Lập trình hướng đối tượng',
    //   code: 'IT4002',
    //   date: '17/11/2025',
    //   time: '08:00-09:30',
    //   room: 'P201-GĐ2',
    //   status: 'registered'
    // }
    
  ];

  return (
    <div className="detail-modal-overlay" onClick={onClose}>
      <div className="detail-modal-main" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="detail-modal-header">
          <div>
            <h2 className="detail-modal-title">Lịch thi đã đăng ký</h2>
            <p className="detail-modal-subtitle">{student.name} - MSSV: {student.code}</p>
          </div>
          <button onClick={onClose} className="detail-modal-close-btn">
            <IoIosClose className="detail-close-icon" />
          </button>
        </div>

        {/* Body */}
        <div className="detail-modal-body">
          {registeredExams.length === 0 ? (
            <div className="empty-state">
              <FaCalendarAlt className="detail-empty-icon" />
              <p>Chưa có lịch thi đăng ký</p>
            </div>
          ) : (
            <div className="exam-list">
              {registeredExams.map((exam) => (
                <div key={exam.id} className="exam-card">
                  <div className="exam-header">
                    <div>
                      <h3 className="exam-name">{exam.name}</h3>
                      <p className="exam-code">Mã môn: {exam.code}</p>
                    </div>
                    <span className="exam-status">Đã đăng ký</span>
                  </div>
                  
                  <div className="exam-details">
                    <div className="exam-detail-item">
                      <FaCalendarAlt className="detail-icon" />
                      <div className="detail-content">
                        <span className="detail-label">Ngày thi</span>
                        <span className="detail-value">{exam.date}</span>
                      </div>
                    </div>
                    
                    <div className="exam-detail-item">
                      <FaRegClock className="detail-icon" />
                      <div className="detail-content">
                        <span className="detail-label">Giờ thi</span>
                        <span className="detail-value">{exam.time}</span>
                      </div>
                    </div>
                    
                    <div className="exam-detail-item">
                      <HiMiniComputerDesktop className="detail-icon" />
                      <div className="detail-content">
                        <span className="detail-label">Phòng thi</span>
                        <span className="detail-value">{exam.room}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDetailModal;