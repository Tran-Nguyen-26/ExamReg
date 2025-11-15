import { useState } from "react"
import Header from "../../../components/admin/header/Header"
import Sidebar from "../../../components/admin/sidebar/Sidebar"
import ExamCard from "../../../components/admin/examCard/ExamCard";
import { IoMdAdd } from "react-icons/io";
import './Style-ExamManagement.css'

const ExamManagement = () => {
    const [exams] = useState([
        {
        id: 1,
        name: 'Kỳ thi giữa kỳ - Học kỳ 1 (2024-2025)',
        startDate: '10/11/2025',
        endDate: '20/11/2025',
        status: 'active',
        subjects: [
            { code: 'IT4001', name: 'Cơ sở dữ liệu' },
            { code: 'IT4002', name: 'Lập trình hướng đối tượng' },
            { code: 'IT4003', name: 'Mạng máy tính' }
        ],
        totalSubjects: 3,
        totalSessions: 8,
        totalRegistrations: 350
        },
        {
        id: 2,
        name: 'Kỳ thi cuối kỳ - Học kỳ 1 (2024-2025)',
        startDate: '25/12/2025',
        endDate: '10/01/2026',
        status: 'upcoming',
        subjects: [
            { code: 'IT4001', name: 'Cơ sở dữ liệu' },
            { code: 'IT4002', name: 'Lập trình hướng đối tượng' },
            { code: 'IT4003', name: 'Mạng máy tính' },
            { code: 'IT4004', name: 'Cấu trúc dữ liệu' },
            { code: 'IT4005', name: 'Hệ điều hành' }
        ],
        totalSubjects: 5,
        totalSessions: 15,
        totalRegistrations: 0
        }
    ]);

    const handleCreateExam = () => {
        alert('Tạo kỳ thi mới');
    };

    const handleViewDetail = (exam) => {
        alert(`Xem chi tiết: ${exam.name}`);
    };

    const handleAddSubject = (exam) => {
        alert(`Thêm môn thi cho: ${exam.name}`);
    };

    const handleEdit = (exam) => {
        alert(`Chỉnh sửa: ${exam.name}`);
    };

    const handleClose = (exam) => {
        if (confirm(`Bạn có chắc muốn đóng kỳ thi "${exam.name}"?`)) {
        console.log('Closed exam:', exam);
        }
    };

    return (
        <div className="page">
            <Header/>
            <div className="main">
                <Sidebar/>
                <div className="content">
                    <div className="exam-management-header">
                        <h1 className="exam-management-title">Danh sách các kì thi</h1>
                        <button onClick={handleCreateExam} className="btn-add-exam">
                        <IoMdAdd className="icon-add-exam" />
                        <span>Tạo kì thi mới</span>
                        </button> 
                    </div>       
                    <div className="exam-management-list">
                        {exams.map((exam) => (
                            <ExamCard
                            key={exam.id}
                            exam={exam}
                            onViewDetail={handleViewDetail}
                            onAddSubject={handleAddSubject}
                            onEdit={handleEdit}
                            onClose={handleClose}
                            />
                        ))}
                    </div>       
                </div>
            </div>
        </div>
    )
}
export default ExamManagement;

