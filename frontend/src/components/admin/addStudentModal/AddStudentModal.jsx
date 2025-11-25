import './Style-AddStudentModal.css'
import React, { useState } from 'react'; 
import { studentService } from '../../../services/studentService';

const AddStudentModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    gender: '',
    className: '',
    major: '',
    faculty: '',
    phone: '',
    email: '',
    dob: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.code || !formData.name || !formData.gender ||
        !formData.className || !formData.major || !formData.faculty ||
        !formData.phone || !formData.email || !formData.dob) {
      setError('Vui lòng điền đầy đủ thông tin!');
      return false;
    }

    // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Email không hợp lệ!');
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

    try {
      const response = await studentService.addStudent(formData);
      
      if (response.success) {
        onSave(response.data);
        onClose();
      }
    } catch (err) {
      console.error('Error adding student:', err);
      setError(err.message || 'Có lỗi xảy ra khi thêm sinh viên!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-modal-overlay" onClick={onClose}>
      <div className="add-modal-main" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="add-modal-header">
          <h2 className="add-modal-title">Thêm sinh viên mới</h2>
        </div>

        {/* Body */}
        <div className="add-modal-body">
          <form className="add-student-form">
            {/* Row 1: Mã sinh viên & Họ và tên */}
            <div className="add-student-form-row">
              <div className="add-student-form-group">
                <label className="add-student-form-label">
                  Mã sinh viên <span className="required">*</span>
                </label>
                <input
                  type="text"
                  className="add-student-form-input"
                  value={formData.code}
                  onChange={(e) => handleChange('code', e.target.value)}
                  placeholder="Nhập mã sinh viên"
                />
              </div>

              <div className="add-student-form-group">
                <label className="add-student-form-label">
                  Họ và tên <span className="required">*</span>
                </label>
                <input
                  type="text"
                  className="add-student-form-input"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Nhập họ và tên"
                />
              </div>
            </div>

            {/* Row 2: Giới tính & Ngày sinh */}
            <div className="add-student-form-row">
              <div className="add-student-form-group">
                <label className="add-student-form-label">
                  Giới tính <span className="required">*</span>
                </label>
                <select
                  className="add-student-form-input"
                  value={formData.gender}
                  onChange={(e) => handleChange('gender', e.target.value)}
                >
                  <option value="">Chọn giới tính</option>
                  <option value="MALE">Nam</option>
                  <option value="FEMALE">Nữ</option>
                </select>
              </div>

              <div className="add-student-form-group">
                <label className="add-student-form-label">
                  Ngày sinh <span className="required">*</span>
                </label>
                <input
                  type="date"
                  className="add-student-form-input"
                  value={formData.dob}
                  onChange={(e) => handleChange('dob', e.target.value)}
                />
              </div>
            </div>

            {/* Row 3: Lớp & Số điện thoại */}
            <div className="add-student-form-row">
              <div className="add-student-form-group">
                <label className="add-student-form-label">
                  Lớp <span className="required">*</span>
                </label>
                <input
                  type="text"
                  className="add-student-form-input"
                  value={formData.className}
                  onChange={(e) => handleChange('className', e.target.value)}
                  placeholder="Nhập lớp"
                />
              </div>

              <div className="add-student-form-group">
                <label className="add-student-form-label">
                  Số điện thoại <span className="required">*</span>
                </label>
                <input
                  type="tel"
                  className="add-student-form-input"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="Nhập số điện thoại"
                />
              </div>
            </div>
            {/* Row 4: Khoa & Ngành */}
            <div className="add-student-form-row">
              <div className="add-student-form-group">
                  <label className="add-student-form-label">
                    Ngành <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    className="add-student-form-input"
                    value={formData.major}
                    onChange={(e) => handleChange('major', e.target.value)}
                    placeholder="Nhập ngành học"
                  />
              </div>

              <div className="add-student-form-group">
                <label className="add-student-form-label">
                  Khoa <span className="required">*</span>
                </label>
                <input
                  type="text"
                  className="add-student-form-input"
                  value={formData.faculty}
                  onChange={(e) => handleChange('faculty', e.target.value)}
                  placeholder="Nhập khoa"
                />
              </div>
            </div>

            {/* Row 5: Email */}
            <div className="add-student-form-group">
              <label className="add-student-form-label">
                Email <span className="required">*</span>
              </label>
              <input
                type="email"
                className="add-student-form-input"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="Nhập email"
              />
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="add-student-modal-footer">
          <button onClick={onClose} className="btn-cancel">
            Hủy
          </button>
          <button onClick={handleSubmit} className="btn-add" disabled={loading}>
            {loading ? 'Đang thêm...' : 'Thêm sinh viên'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddStudentModal;