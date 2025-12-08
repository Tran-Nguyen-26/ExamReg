import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { FaUserGraduate, FaSearch } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";
import "./Style-ViewListStudentSession.css";

const ViewListStudentSession = ({ session, onClose }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Giả lập dữ liệu sinh viên - thay bằng API call thực tế
    const fetchStudents = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock data - thay bằng API call thực tế
        const mockStudents = [
          {
            id: 1,
            studentId: "2021600001",
            fullName: "Nguyễn Văn An",
            email: "an.nv@student.edu.vn",
            phone: "0901234567",
            registeredAt: "2024-01-15 10:30"
          },
          {
            id: 2,
            studentId: "2021600002",
            fullName: "Trần Thị Bình",
            email: "binh.tt@student.edu.vn",
            phone: "0902345678",
            registeredAt: "2024-01-15 11:20"
          },
          {
            id: 3,
            studentId: "2021600003",
            fullName: "Lê Hoàng Cường",
            email: "cuong.lh@student.edu.vn",
            phone: "0903456789",
            registeredAt: "2024-01-15 14:45"
          },
          {
            id: 4,
            studentId: "2021600004",
            fullName: "Phạm Minh Đức",
            email: "duc.pm@student.edu.vn",
            phone: "0904567890",
            registeredAt: "2024-01-16 09:15"
          },
          {
            id: 5,
            studentId: "2021600005",
            fullName: "Hoàng Thu Hà",
            email: "ha.ht@student.edu.vn",
            phone: "0905678901",
            registeredAt: "2024-01-16 10:30"
          }
        ];
        
        setStudents(mockStudents);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [session]);

  const filteredStudents = students.filter(student =>
    student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentId.includes(searchTerm) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="view-list-student-session-overlay" onClick={onClose}>
      <div className="view-list-student-session-container" onClick={(e) => e.stopPropagation()}>
        <div className="view-list-student-session-header">
          <div className="view-list-student-session-title-section">
            <FaUserGraduate className="view-list-student-session-icon" />
            <div>
              <h2 className="view-list-student-session-title">Danh sách sinh viên đã đăng ký</h2>
              <p className="view-list-student-session-subtitle">
                {session.subject} - {session.time} - {session.date} - {session.room} - {session.location}
              </p>
            </div>
          </div>
          <button className="view-list-student-session-close-btn" onClick={onClose}>
            <IoClose />
          </button>
        </div>

        <div className="view-list-student-session-body">
          <div className="view-list-studentsinfo-bar">
            <div className="view-list-studentscount-badge">
              <span className="view-list-studentscount-label">Đã đăng ký:</span>
              <span className="view-list-studentscount-number">{students.length}/{session.capacity}</span>
            </div>
            
            <div className="view-list-studentssearch-box">
              <FaSearch className="view-list-studentssearch-icon" />
              <input
                type="text"
                placeholder="Tìm kiếm theo tên, MSSV, email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="view-list-studentssearch-input"
              />
            </div>
          </div>

          {loading ? (
            <div className="view-list-studentsloading">
              <div className="view-list-studentsloading-spinner"></div>
              <p>Đang tải danh sách sinh viên...</p>
            </div>
          ) : filteredStudents.length === 0 ? (
            <div className="view-list-studentsempty">
              <FaUserGraduate className="view-list-studentsempty-icon" />
              <p className="view-list-studentsempty-text">
                {searchTerm ? "Không tìm thấy sinh viên phù hợp" : "Chưa có sinh viên đăng ký"}
              </p>
            </div>
          ) : (
            <div className="view-list-studentstable-wrapper">
              <table className="view-list-studentstable">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>MSSV</th>
                    <th>Họ và tên</th>
                    <th>Email</th>
                    <th>Số điện thoại</th>
                    <th>Thời gian đăng ký</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student, index) => (
                    <tr key={student.id}>
                      <td>{index + 1}</td>
                      <td className="view-list-studentstable-id">{student.studentId}</td>
                      <td className="view-list-studentstable-name">{student.fullName}</td>
                      <td>
                        <div className="view-list-studentstable-contact">
                          <MdEmail className="view-list-studentscontact-icon" />
                          {student.email}
                        </div>
                      </td>
                      <td>
                        <div className="view-list-studentstable-contact">
                          <MdPhone className="view-list-studentscontact-icon" />
                          {student.phone}
                        </div>
                      </td>
                      <td className="view-list-studentstable-time">{student.registeredAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="view-list-student-session-footer">
          <button className="view-list-studentsbtn-secondary" onClick={onClose}>
            Đóng
          </button>
          <button className="view-list-studentsbtn-primary">
            Xuất danh sách
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewListStudentSession;