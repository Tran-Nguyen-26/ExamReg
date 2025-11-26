import '../createExamModal/Style-CreateExamModal.css';
import { IoIosClose } from "react-icons/io";
import { useState } from 'react';

const CreateCourseModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    credits: '',
    semester: '',
    duration: '',
    status: 'Active'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.code || !formData.name) {
      alert('Mã môn và Tên môn là bắt buộc');
      return;
    }
    const course = {
      ...formData,
      credits: formData.credits ? Number(formData.credits) : 0,
      semester: formData.semester ? Number(formData.semester) : 0
    };
    onSubmit(course);
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setFormData({ code: '', name: '', credits: '', semester: '', duration: '', status: 'Active' });
    onClose();
  };

  return (
    <div className='create-exam-modal-overlay' onClick={handleCloseModal}>
      <div className='create-exam-modal-main' onClick={(e) => e.stopPropagation()}>
        <div className='create-exam-modal-header'>
          <h2 className='create-exam-modal-title'>Thêm môn học mới</h2>
          <button className='create-exam-modal-close-btn' onClick={handleCloseModal}>
            <IoIosClose className='create-exam-modal-close-icon' />
          </button>
        </div>
        <form onSubmit={handleSubmit} className='create-exam-modal-form'>
          <div className='create-exam-form-row'>
            <div className='create-exam-form-group'>
              <label className='create-exam-form-label'>Mã môn <span className='required'>*</span></label>
              <input name='code' value={formData.code} onChange={handleInputChange} className='create-exam-form-input' required />
            </div>
            <div className='create-exam-form-group'>
              <label className='create-exam-form-label'>Tên môn <span className='required'>*</span></label>
              <input name='name' value={formData.name} onChange={handleInputChange} className='create-exam-form-input' required />
            </div>
          </div>

          <div className='create-exam-form-row'>
            <div className='create-exam-form-group'>
              <label className='create-exam-form-label'>Số tín chỉ</label>
              <input type='number' name='credits' value={formData.credits} onChange={handleInputChange} className='create-exam-form-input' />
            </div>
            <div className='create-exam-form-group'>
              <label className='create-exam-form-label'>Học kỳ</label>
              <input type='number' name='semester' value={formData.semester} onChange={handleInputChange} className='create-exam-form-input' />
            </div>
          </div>

          <div className='create-exam-form-group'>
            <label className='create-exam-form-label'>Thời lượng thi</label>
            <input name='duration' value={formData.duration} onChange={handleInputChange} className='create-exam-form-input' placeholder='e.g. 90 phút' />
          </div>

          <div className='create-exam-modal-footer'>
            <button className='create-exam-modal-btn-cancel' onClick={handleCloseModal}>Hủy</button>
            <button className='create-exam-modal-btn-submit' type='submit'>Thêm môn</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCourseModal;
