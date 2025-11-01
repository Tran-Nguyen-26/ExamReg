import './Style-StudentTable.css'
import { FaEye } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";

const StudentTable = ({ students, onView, onEdit, onDelete }) => (
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
                    onClick={() => onView(student)}
                    className="action-btn action-btn-view"
                    title="Xem"
                  >
                    <FaEye className="action-icon" />
                  </button>
                  <button
                    onClick={() => onEdit(student)}
                    className="action-btn"
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
);

export default StudentTable;
