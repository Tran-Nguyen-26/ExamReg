import { useState } from "react"
import Header from "../../../components/admin/header/Header"
import Sidebar from "../../../components/admin/sidebar/Sidebar"
import { IoMdAdd } from "react-icons/io";
import { FiArrowLeft } from "react-icons/fi";
import SubjectTableExam from "../../../components/admin/subjectTableExam/SubjectTableExam";
import { useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import './Style-ExamInformation.css'

const ExamInformation = () => {
    const handleAddSubject = (exam) => {
        alert(`Thêm môn thi cho: ${exam.name}`);
    };
    const navigate = useNavigate();

    const [subjects] = useState([
    {
      id: 1,
      code: "MATH101",
      name: "Giải tích 1",
      sessions: 2,
      creditHour: 3,
      duration: "90 phút"
    },
    {
      id: 2,
      code: "PHYS102",
      name: "Vật lý đại cương",
      sessions: 2,
      creditHour: 3,
      duration: "60 phút"
    },
    {
      id: 3,
      code: "CS103",
      name: "Nhập môn lập trình",
      sessions: 2,
      creditHour: 4,
      duration: "120 phút"
    },
    {
      id: 4,
      code: "ENG104",
      name: "Tiếng Anh học thuật",
      sessions: 2,
      creditHour: 2,
      duration: "75 phút"
    },
    {
      id: 5,
      code: "HIS105",
      name: "Lịch sử Đảng Cộng sản Việt Nam",
      sessions: 2,
      creditHour: 2,
      duration: "60 phút"
    },
    {
      id: 6,
      code: "HIS105",
      name: "Lịch sử Đảng Cộng sản Việt Nam",
      sessions: 2,
      creditHour: 2,
      duration: "60 phút"
    },
    {
      id: 7,
      code: "HIS105",
      name: "Lịch sử Đảng Cộng sản Việt Nam",
      sessions: 2,
      creditHour: 2,
      duration: "60 phút"
    },
    {
      id: 8,
      code: "HIS105",
      name: "Lịch sử Đảng Cộng sản Việt Nam",
      sessions: 2,
      creditHour: 2,
      duration: "60 phút"
    },
    {
      id: 9,
      code: "HIS105",
      name: "Lịch sử Đảng Cộng sản Việt Nam",
      sessions: 2,
      creditHour: 2,
      duration: "60 phút"
    },
    {
      id: 10,
      code: "HIS105",
      name: "Lịch sử Đảng Cộng sản Việt Nam",
      sessions: 2,
      creditHour: 2,
      duration: "60 phút"
    },
    {
      id: 11,
      code: "HIS105",
      name: "Lịch sử Đảng Cộng sản Việt Nam",
      sessions: 2,
      creditHour: 2,
      duration: "60 phút"
    },
    
  ]);

    return (
        <div className="page">
            <Header/>
            <div className="main">
                <Sidebar/>
                <div className="content">
                    <div className="exam-information-header">
                        <div className="exam-information-header-left">
                            <div onClick={() => navigate("/admin/exam-management")}>
                                <FiArrowLeft />
                            </div>
                            <h1 className="exam-information-title">Danh sách môn thi</h1>
                        </div>
                        <div className="search-subject-wrapper">
                          <input
                            type="text"
                            placeholder="Tìm kiếm theo tên, mã sinh viên"
                            onChange={(e) => onSearch(e.target.value)}
                            className="search-subject-input"
                          />
                          <button className="search-subject-btn">
                            <IoIosSearch className="search-subject-icon" />
                          </button>
                        </div>
                        <button onClick={handleAddSubject} className="btn-add-subject">
                          <IoMdAdd className="icon-add-subject" />
                          <span>Thêm môn thi</span>
                        </button> 
                    </div> 
                    <SubjectTableExam
                    subjects={subjects}/>
                </div>
            </div>
        </div>
    )
}
export default ExamInformation;

