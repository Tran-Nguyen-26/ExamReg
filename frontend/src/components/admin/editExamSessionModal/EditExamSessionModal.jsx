import './Style-EditExamSessionModal.css';
import React, { useState } from 'react';

const EditExamSessionModal = ({ onClose, onSave, subjectInfo }) => {
  const [formData, setFormData] = useState({
    examDate: '',
    startTime: '',
    room: '',
    location: '',
    capacity: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Danh sách phòng thi có sẵn
  const availableRooms = [
    '101', '102', '103', '104', '105',
    '201', '202', '203', '204', '205',
    '301', '302', '303', '304', '305'
  ];

  // Danh sách địa điểm thi
  const availableLocations = [
    'Tòa nhà A',
    'Tòa nhà B',
    'Tòa nhà C',
    'Tòa nhà D',
    'Tòa nhà E'
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.examDate) {
      setError('Vui lòng chọn ngày thi!');
      return false;
    }
    if (!formData.startTime) {
      setError('Vui lòng nhập giờ bắt đầu!');
      return false;
    }
    if (!formData.room) {
      setError('Vui lòng chọn phòng thi!');
      return false;
    }
    if (!formData.location) {
      setError('Vui lòng chọn địa điểm thi!');
      return false;
    }
    if (!formData.capacity || formData.capacity <= 0) {
      setError('Vui lòng nhập sức chứa hợp lệ!');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      onSave(formData);
      onClose();
    }, 500);
  };

  return (
    <div className="edit-exam-session-modal-overlay" onClick={onClose}>
      <div className="edit-exam-session-modal-main" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="edit-exam-session-modal-header">
          <div>
            <h2 className="edit-exam-session-modal-title">Chỉnh sửa ca thi</h2>
          </div>
          <button className="edit-exam-session-modal-close-btn" onClick={onClose}>×</button>
        </div>

        <div className="edit-exam-session-modal-body">
          {error && (
            <div className="error-message">
              ⚠️ {error}
            </div>
          )}

          <form className="edit-exam-session-form">
            {/* Row 1: Tên môn thi & Sức chứa phòng thi */}
            <div className="edit-exam-session-form-row">
              

                <div className="edit-exam-session-form-group">
                    <label className="edit-exam-session-form-label">
                    Tên môn thi
                    </label>
                    <input
                    type="text"
                    className="edit-exam-session-form-input"
                    />
                </div>
                <div className="form-group">
                    <label className="edit-exam-session-form-label">
                        Sức chứa phòng thi <span className="required">*</span>
                    </label>
                    <input
                        type="number"
                        className="edit-exam-session-form-input"
                        value={formData.capacity}
                        onChange={(e) => handleChange('capacity', e.target.value)}
                        placeholder="Số sinh viên tối đa"
                        min="1"
                        disabled={loading}
                    />
                </div>
            </div>
            <div className='edit-exam-session-form-row'>
                <div className="edit-exam-session-form-group">
                    <label className="edit-exam-session-form-label">
                    Ngày thi <span className="required">*</span>
                    </label>
                    <input
                    type="date"
                    className="edit-exam-session-form-input"
                    value={formData.examDate}
                    onChange={(e) => handleChange('examDate', e.target.value)}
                    disabled={loading}
                    />
                </div>
                <div className="edit-exam-session-form-group">
                    <label className="edit-exam-session-form-label">
                    Giờ bắt đầu <span className="required">*</span>
                    </label>
                    <input
                    type="text"
                    className="edit-exam-session-form-input"
                    value={formData.startTime}
                    onChange={(e) => handleChange('startTime', e.target.value)}
                    placeholder="Định dạng: HH:MM"
                    disabled={loading}
                    />
                </div>
            </div>
            <div className="edit-exam-session-form-row">
                <div className="edit-exam-session-form-group">
                    <label className="edit-exam-session-form-label">
                    Địa điểm thi <span className="required">*</span>
                    </label>
                    <select
                    className="edit-exam-session-form-input edit-exam-session-form-select"
                    value={formData.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                    disabled={loading}
                    >
                    <option value="">Chọn địa điểm</option>
                    {availableLocations.map(location => (
                        <option key={location} value={location}>{location}</option>
                    ))}
                    </select>
                </div>
                
                <div className="edit-exam-session-form-group">
                    <label className="edit-exam-session-form-label">
                    Phòng thi <span className="required">*</span>
                    </label>
                    <select
                    className="edit-exam-session-form-input edit-exam-session-form-select"
                    value={formData.room}
                    onChange={(e) => handleChange('room', e.target.value)}
                    disabled={loading}
                    >
                    <option value="">Chọn phòng thi</option>
                    {availableRooms.map(room => (
                        <option key={room} value={room}>{room}</option>
                    ))}
                    </select>
                </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="edit-exam-session-modal-footer">
          <button onClick={onClose} className="btn-cancel" disabled={loading}>
            Hủy
          </button>
          <button onClick={handleSubmit} className="btn-create" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner"></span>
                Đang tạo...
              </>
            ) : (
              <>
                Lưu thay đổi
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditExamSessionModal;