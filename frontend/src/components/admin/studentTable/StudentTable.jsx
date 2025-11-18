import './Style-StudentTable.css';
import StudentDetailModal from '../studenDetailModal/StudentDetailModal';
import EditStudentModal from '../editStudentModal/EditStudentModal';
import { FaEye } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState } from 'react';

const StudentTable = ({ students, onDelete }) =>{
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleViewClick = (student) => {
    setSelectedStudent(student);
    setIsDetailModalOpen(true);
  };

  const handleEditClick = (student) => {
    setSelectedStudent(student);
    setIsEditModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedStudent(null);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedStudent(null);
  };
  const handleSave = (updatedData) => {
    console.log('Updated student data:', updatedData);
    onEdit(updatedData);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const totalPages = Math.ceil(students.length / itemsPerPage); //làm tròn lên
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentStudents = students.slice(startIndex, endIndex); //slice() lấy một phần con của mảng subjects từ startIndex đến endIndex (không tính endIndex)
  
  // Xử lý chuyển trang
  const goToPage = (page) => {
      setCurrentPage(page); //khi currentPage thay đổi, render lại trang mới
  };
  
  const goToPrevious = () => {
      if (currentPage > 1) {
          setCurrentPage(currentPage - 1); //lùi trang áp dụng từ trang 2
      }
  };
  
  const goToNext = () => {
      if (currentPage < totalPages) {
          setCurrentPage(currentPage + 1); //sang trang trừ trang cuối
      }
  };
  return (
    <>
    <div className="student-table-container">
      <div className="student-table-wrapper">
        <table className="student-table">
          <thead>
            <tr className="student-table-header-row">
              <th className="student-table-header">STT</th>
              <th className="student-table-header">Mã sinh viên</th>
              <th className="student-table-header student-table-row-left">Họ và tên</th>
              <th className="student-table-header">Lớp</th>
              <th className="student-table-header">Ngày sinh</th>
              <th className="student-table-header student-table-row-left">Email</th>
              <th className="student-table-header">Số điện thoại</th>
              <th className="student-table-header">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {currentStudents.map((student, index) => (
              <tr key={student.id} className="student-table-row">
                <td className="student-table-cell">{index + 1}</td>
                <td className="student-table-cell student-code">{student.code}</td>
                <td className="student-table-cell student-table-row-left">{student.name}</td>
                <td className="student-table-cell">{student.class}</td>
                <td className="student-table-cell">{student.dob}</td>
                <td className="student-table-cell student-table-row-left">{student.email}</td>
                <td className="student-table-cell">{student.phone}</td>
                <td className="student-table-cell">
                  <div className="student-table-buttons">
                    <button
                      onClick={() => handleViewClick(student)}
                      className="student-action-btn student-action-btn-view"
                      title="Xem"
                    >
                      <FaEye className="student-action-icon" />
                    </button>
                    <button
                      onClick={() => handleEditClick(student)}
                      className="student-action-btn student-action-btn-edit"
                      title="Sửa"
                    >
                      <MdEdit className="student-action-icon" />
                    </button>
                    <button
                      onClick={() => onDelete(student)}
                      className="student-action-btn student-action-btn-delete"
                      title="Xóa"
                    >
                      <FaTrashAlt className="student-action-icon" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    {isDetailModalOpen && selectedStudent && (
      <StudentDetailModal 
        student={selectedStudent} 
        onClose={handleCloseDetailModal}
      />
    )}
    {isEditModalOpen && selectedStudent && (
      <EditStudentModal 
        student={selectedStudent} 
        onClose={handleCloseEditModal}
        onSave={handleSave}
      />
    )}
    </>
  );
} 

export default StudentTable;
