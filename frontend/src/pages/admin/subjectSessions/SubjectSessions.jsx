import { useNavigate } from "react-router-dom";
import Header from "../../../components/admin/header/Header";
import Sidebar from "../../../components/admin/sidebar/Sidebar";
import { FiArrowLeft } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import SessionTable from "../../../components/admin/sessionTable/SessionTable";
import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import './Style-SubjectSessions.css';

const SubjectSessions = () => {
    const navigate = useNavigate();
    const [sessions] = useState([
    {
      id: 1,
      subject: "Giải tích 1",
      date: "2025-12-01",
      time: "07:00",
      room: "101",
      location: "Tòa nhà A",
      capacity: 50,
      registered: 50, 
    },
    {
      id: 2,
      subject: "Giải tích 1",
      date: "2025-12-02",
      time: "09:00",
      room: "102",
      location: "Tòa nhà B",
      capacity: 45,
      registered: 30,
    },
  ]);

    return (
        <>
        <Header/>
        <div className="main">
            <Sidebar/>
            <div className="content">
                <div className="sessions-header">
                    <div className="sessions-header-left">
                        <div onClick={() => navigate("/admin/exam-management/exam-info")}>
                            <FiArrowLeft/>
                        </div>
                        <h1 className="subject-title">Giải tích 1 - MATH101</h1>
                    </div>
                    <button className="btn-add-session">
                        <IoMdAdd className="icon-add-session"/>
                        <span>Tạo ca thi mới</span>
                    </button>
                </div>
                <SessionTable
                sessions={sessions}
                />
            </div>
        </div>
        </>
    )
}
export default SubjectSessions;