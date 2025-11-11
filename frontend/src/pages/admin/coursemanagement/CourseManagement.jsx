import { useState } from "react";
import Header from "../../../components/admin/header/Header";
import Sidebar from "../../../components/admin/sidebar/Sidebar";
import CourseSearchbar from "../../../components/admin/searchbar/CourseSearchbar";
import SubjectTable from "../../../components/admin/subjectTable/SubjectTable";
import './Style-CourseManagement.css'

const CourseManagement = () => {
    const handleSearch = (query) => {
        console.log('Searching:', query);
    };

    const [subjects] = useState([
        {
            id: 1,
            code: 'CS101',
            name: 'Nhập môn lập trình',
            credits: 3,
            semester: 1,
            instructor: 'TS. Nguyễn Văn A',
            status: 'Active'
        },
        {
            id: 2,
            code: 'CS102',
            name: 'Cấu trúc dữ liệu',
            credits: 4,
            semester: 2,
            instructor: 'TS. Trần Thị B',
            status: 'Active'
        }
    ]);

    const handleAdd = () => {
        alert('Thêm môn học mới');
    };

    const handleView = (subject) => {
        alert(`Xem thông tin: ${subject.name}`);
    };

    const handleEdit = (subject) => {
        alert(`Chỉnh sửa: ${subject.name}`);
    };

    const handleDelete = (subject) => {
        if (confirm(`Bạn có chắc muốn xóa môn học ${subject.name}?`)) {
            console.log('Deleted:', subject);
        }
    };

    return (
        <div className="page">
            <Header/>
            <div className="main">
                <Sidebar/>
                <div className="content">
                    <CourseSearchbar
                        onSearch={handleSearch}
                        onAdd={handleAdd}/>
                    <SubjectTable
                        subjects={subjects}
                        onView={handleView}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </div>
            </div>
        </div>
    )
}
export default CourseManagement;

