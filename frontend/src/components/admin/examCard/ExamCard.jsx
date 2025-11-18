import { CiCalendar } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { IoLockClosedOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./Style-ExamCard.css"

const ExamCard = ({ exam, onViewDetail, onAddSubject, onEdit, onClose }) => {

  const navigate = useNavigate();
  
  const handleViewClick = () => {
    navigate("/admin/exam-management/exam-info")
  }

  const handleButtonClick = (e, action) => {
    e.stopPropagation();
    action(exam);
  };

  return (
    <div className={`exam-management-card ${exam.status}`} onClick={handleViewClick}>
      {/* Exam Header */}
      <div className="exam-management-card-header">
        <div>
          <h2 className="exam-management-card-title">{exam.name}</h2>
          <div className="exam-management-card-date">
            <CiCalendar className="exam-management-date-icon" />
            <span>{exam.startDate} - {exam.endDate}</span>
          </div>
        </div>
        <span className={`exam-management-status ${exam.status}`}>
          {exam.status === 'active' ? 'Đang mở' : 'Sắp mở'}
        </span>
      </div>

      {/* Statistics */}
      <div className="exam-management-stats">
        <div className="stat-management-card stat-card-subjects">
          <span className="stat-card-label">Số môn thi</span>
          <span className="stat-card-value">{exam.totalSubjects}</span>
        </div>
        <div className="stat-management-card stat-card-sessions">
          <span className="stat-card-label">Số ca thi</span>
          <span className="stat-card-value">{exam.totalSessions}</span>
        </div>
        <div className="stat-management-card stat-card-registrations">
          <span className="stat-card-label">Lượt đăng ký</span>
          <span className="stat-card-value">{exam.totalRegistrations}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="exam-management-actions">
        <button 
          className="exam-mangement-btn-action exam-management-btn-view"
          onClick={(e) => {
            e.stopPropagation();
            handleViewClick();
          }}
        >
          <IoEyeOutline className="exam-management-action-icon" />
          <span>Xem chi tiết</span>
        </button>
        <button 
          className="exam-mangement-btn-action exam-management-btn-add"
          onClick={(e) => handleButtonClick(e, onAddSubject)}
        >
          <IoMdAdd className="exam-management-action-icon" />
          <span>Thêm môn thi</span>
        </button>
        <button 
          className="exam-mangement-btn-action exam-management-btn-edit"
          onClick={(e) => handleButtonClick(e, onEdit)}
        >
          <MdEdit className="exam-management-action-icon" />
          <span>Chỉnh sửa</span>
        </button>
        <button 
          className="exam-mangement-btn-action exam-management-btn-close"
          onClick={() => handleButtonClick(e, onClose)}
        >
          <IoLockClosedOutline className="exam-management-action-icon"/>
          <span>Khóa kỳ thi</span>
        </button>
      </div>
    </div>
  );
};

export default ExamCard;