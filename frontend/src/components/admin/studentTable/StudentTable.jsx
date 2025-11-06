import './Style-StudentTable.css';
import StudentDetailModal from '../studenDetailModal/studentDetailModal';
import EditStudentModal from '../editStudentModal/EditStudentModal';
import { FaEye } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import React, { useState } from 'react';

const StudentTable = ({ students, onView, onEdit, onDelete }) =>{
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
  return (
    <>
    <div className="table-container">
      <div className="table-wrapper">
        <table className="student-table">
          <thead>
            <tr className="table-header-row">
              <th className="table-header">STT</th>
              <th className="table-header">Mã sinh viên</th>
              <th className="table-header">Họ và tên</th>
              <th className="table-header">Lớp</th>
              <th className="table-header">Ngày sinh</th>
              <th className="table-header">Email</th>
              <th className="table-header">Số điện thoại</th>
              <th className="table-header table-header-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student.id} className="table-row">
                <td className="table-cell table-cell-center">{index + 1}</td>
                <td className="table-cell table-cell-code table-cell-center">{student.code}</td>
                <td className="table-cell">{student.name}</td>
                <td className="table-cell">{student.class}</td>
                <td className="table-cell">{student.dob}</td>
                <td className="table-cell table-cell-email">{student.email}</td>
                <td className="table-cell">{student.phone}</td>
                <td className="table-cell">
                  <div className="buttons">
                    <button
                      onClick={() => handleViewClick(student)}
                      className="action-btn action-btn-view"
                      title="Xem"
                    >
                      <FaEye className="action-icon" />
                    </button>
                    <button
                      onClick={() => handleEditClick(student)}
                      className="action-btn action-btn-edit"
                      title="Sửa"
                    >
                      <MdEdit className="action-icon" />
                    </button>
                    <button
                      onClick={() => onDelete(student)}
                      className="action-btn action-btn-delete"
                      title="Xóa"
                    >
                      <FaTrashAlt className="action-icon" />
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
