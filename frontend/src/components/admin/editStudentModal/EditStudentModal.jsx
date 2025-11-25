import './Style-EditStudentModal.css'
import React, { useState } from 'react'; 

const EditStudentModal = ({ student, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    code: student.code,
    name: student.name,
    gender: student.gender || '',
    class: student.class,
    major: student.major || '',
    department: student.department || '',
    phone: student.phone,
    email: student.email,
    dob: student.dob
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="edit-modal-overlay" onClick={onClose}>
      <div className="edit-modal-main" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="edit-modal-header">
          <h2 className="edit-modal-title">Chỉnh sửa thông tin sinh viên</h2>
        </div>

        {/* Body */}
        <div className="edit-modal-body">
          <form className="edit-student-form">
            {/* Row 1: Mã sinh viên & Họ và tên */}
            <div className="edit-student-form-row">
              <div className="edit-student-form-group">
                <label className="edit-student-form-label">
                  Mã sinh viên <span className="required">*</span>
                </label>
                <input
                  type="text"
                  className="edit-student-form-input"
                  value={formData.code}
                  onChange={(e) => handleChange('code', e.target.value)}
                  placeholder="Nhập mã sinh viên"
                />
              </div>

              <div className="edit-student-form-group">
                <label className="edit-student-form-label">
                  Họ và tên <span className="required">*</span>
                </label>
                <input
                  type="text"
                  className="edit-student-form-input"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Nhập họ và tên"
                />
              </div>
            </div>

            {/* Row 2: Giới tính & Ngày sinh */}
            <div className="edit-student-form-row">
              <div className="edit-student-form-group">
                <label className="edit-student-form-label">
                  Giới tính <span className="required">*</span>
                </label>
                <select
                  className="edit-student-form-input"
                  value={formData.gender}
                  onChange={(e) => handleChange('gender', e.target.value)}
                >
                  <option value="">Chọn giới tính</option>
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                  <option value="Khác">Khác</option>
                </select>
              </div>

              <div className="edit-student-form-group">
                <label className="edit-student-form-label">
                  Ngày sinh <span className="required">*</span>
                </label>
                <input
                  type="date"
                  className="edit-student-form-input"
                  value={formData.dob}
                  onChange={(e) => handleChange('dob', e.target.value)}
                />
              </div>
            </div>

            {/* Row 3: Lớp & Số điện thoại */}
            <div className="edit-student-form-row">
              <div className="edit-student-form-group">
                <label className="edit-student-form-label">
                  Lớp <span className="required">*</span>
                </label>
                <input
                  type="text"
                  className="edit-student-form-input"
                  value={formData.class}
                  onChange={(e) => handleChange('class', e.target.value)}
                  placeholder="Nhập lớp"
                />
              </div>

              <div className="edit-student-form-group">
                <label className="edit-student-form-label">
                  Số điện thoại <span className="required">*</span>
                </label>
                <input
                  type="tel"
                  className="edit-student-form-input"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="Nhập số điện thoại"
                />
              </div>
            </div>

            {/* Row 4: Ngành & Khoa */}
            <div className="edit-student-form-row">
              <div className="edit-student-form-group">
                <label className="edit-student-form-label">
                  Ngành <span className="required">*</span>
                </label>
                <input
                  type="text"
                  className="edit-student-form-input"
                  value={formData.major}
                  onChange={(e) => handleChange('major', e.target.value)}
                  placeholder="Nhập ngành học"
                />
              </div>
              
              <div className="edit-student-form-group">
                <label className="edit-student-form-label">
                  Khoa <span className="required">*</span>
                </label>
                <input
                  type="text"
                  className="edit-student-form-input"
                  value={formData.department}
                  onChange={(e) => handleChange('department', e.target.value)}
                  placeholder="Nhập khoa"
                />
              </div>
            </div>

            {/* Row 5: Email */}
            <div className="edit-student-form-group">
              <label className="edit-student-form-label">
                Email <span className="required">*</span>
              </label>
              <input
                type="email"
                className="edit-student-form-input"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="Nhập email"
              />
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="edit-student-modal-footer">
          <button onClick={onClose} className="btn-cancel">
            Hủy
          </button>
          <button onClick={handleSubmit} className="btn-save">
            Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditStudentModal;