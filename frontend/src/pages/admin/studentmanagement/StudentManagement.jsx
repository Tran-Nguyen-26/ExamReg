import { useState } from "react";
import Header from "../../../components/admin/header/Header";
import Sidebar from "../../../components/admin/sidebar/Sidebar"
import Searchbar from "../../../components/admin/searchbar/Searchbar";
import StudentTable from "../../../components/admin/studentTable/StudentTable";
import './Style-StudentManagement.css'
const StudentManagement = () => {
    const [activeMenu, setActiveMenu] = useState('student');
    const handleSearch = (query) => {
        console.log('Searching:', query);
    };
    const [students] = useState([
        {
        id: 1,
        code: '2022001',
        name: 'Nguyễn Văn A',
        class: 'IS1-4',
        dob: '29/11/2005',
        email: 'nguyenvana@gmail.com',
        phone: '0928361923'
        },
        {
        id: 2,
        code: '2022927',
        name: 'Nguyễn Thị B',
        class: 'IS1-4',
        dob: '12/12/2005',
        email: 'nguyenthib@gmail.com',
        phone: '0918972361'
        }
    ]);


    const handleImport = () => {
        alert('Chức năng Import Excel');
    };

    const handleAdd = () => {
        alert('Thêm sinh viên mới');
    };

    const handleView = (student) => {
        alert(`Xem thông tin: ${student.name}`);
    };

    const handleEdit = (student) => {
        alert(`Chỉnh sửa: ${student.name}`);
    };

    const handleDelete = (student) => {
        if (confirm(`Bạn có chắc muốn xóa sinh viên ${student.name}?`)) {
        console.log('Deleted:', student);
        }
    };
        
    return (
        <div className="page">
            <Header/>
            <div className="main">
                <Sidebar 
                activeMenu={activeMenu}
                onMenuChange={setActiveMenu}
                />
                <div className="content">
                    <Searchbar
                    onSearch={handleSearch}
                    onImport={handleImport}
                    onAdd={handleAdd}/>
                    <StudentTable
                    students={students}
                    onView={handleView}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    />
                </div>
            </div>
        </div>
    )
}
export default StudentManagement;