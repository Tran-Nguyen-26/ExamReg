import './Style-SubjectTable.css';
import { FaEye } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import React, { useState } from 'react';

const SubjectTable = ({ subjects, onView, onEdit, onDelete }) => {
  const [selectedSubject, setSelectedSubject] = useState(null);

  const handleViewClick = (subject) => {
    setSelectedSubject(subject);
    onView(subject);
  };

  const handleEditClick = (subject) => {
    setSelectedSubject(subject);
    onEdit(subject);
  };

  return (
    <div className="table-container">
      <div className="table-wrapper">
        <table className="subject-table">
          <thead>
            <tr className="table-header-row">
              <th className="table-header">STT</th>
              <th className="table-header">Mã môn</th>
              <th className="table-header">Tên môn học</th>
              <th className="table-header">Số tín chỉ</th>
              <th className="table-header">Giảng viên</th>
              <th className="table-header table-header-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject, index) => (
              <tr key={subject.id} className="table-row">
                <td className="table-cell table-cell-center">{index + 1}</td>
                <td className="table-cell table-cell-code table-cell-center">{subject.code}</td>
                <td className="table-cell">{subject.name}</td>
                <td className="table-cell table-cell-center">{subject.credits}</td>
                <td className="table-cell">{subject.instructor}</td>
                <td className="table-cell">
                  <div className="buttons">
                    <button
                      onClick={() => handleViewClick(subject)}
                      className="action-btn action-btn-view"
                      title="Xem"
                    >
                      <FaEye className="action-icon" />
                    </button>
                    <button
                      onClick={() => handleEditClick(subject)}
                      className="action-btn action-btn-edit"
                      title="Sửa"
                    >
                      <MdEdit className="action-icon" />
                    </button>
                    <button
                      onClick={() => onDelete(subject)}
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
  );
};

export default SubjectTable;
