import './Style-EditStudentModal.css'
import React, { useState } from 'react'; 

const EditStudentModal = ({ student, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    code: student.code,
    name: student.name,
    class: student.class,
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
          <form className="edit-form">
            {/* Row 1: Mã sinh viên & Họ và tên */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  Mã sinh viên <span className="required">*</span>
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.code}
                  onChange={(e) => handleChange('code', e.target.value)}
                  placeholder="Nhập mã sinh viên"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  Họ và tên <span className="required">*</span>
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Nhập họ và tên"
                />
              </div>
            </div>

            {/* Row 2: Lớp & Số điện thoại */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  Lớp <span className="required">*</span>
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.class}
                  onChange={(e) => handleChange('class', e.target.value)}
                  placeholder="Nhập lớp"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  Số điện thoại <span className="required">*</span>
                </label>
                <input
                  type="tel"
                  className="form-input"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="Nhập số điện thoại"
                />
              </div>
            </div>

            {/* Row 4: Ngày sinh */}
            <div className="form-group">
              <label className="form-label">
                Ngày sinh <span className="required">*</span>
              </label>
              <input
                type="date"
                className="form-input"
                value={formData.dob}
                onChange={(e) => handleChange('dob', e.target.value)}
              />
            </div>

            {/* Row 3: Email */}
            <div className="form-group">
              <label className="form-label">
                Email <span className="required">*</span>
              </label>
              <input
                type="email"
                className="form-input"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="Nhập email"
              />
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="edit-modal-footer">
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