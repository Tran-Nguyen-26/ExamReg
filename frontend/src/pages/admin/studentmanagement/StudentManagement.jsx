import { useState, useEffect } from "react";
import Header from "../../../components/admin/header/Header";
import Sidebar from "../../../components/admin/sidebar/Sidebar"
import StudentSearchBar from "../../../components/admin/searchbar/StudentSearchBar";
import StudentTable from "../../../components/admin/studentTable/StudentTable";
import { studentService } from "../../../services/studentService";
import './Style-StudentManagement.css'
const StudentManagement = () => {
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // useEffect(() => {
    //     loadStudents();
    // }, []);

    // const loadStudents = async () => {
    //     setLoading(true);
    //     setError('');
    //     try {
    //         const response = await studentService.getAllStudents();
    //         if (response.success) {
    //             const formattedStudents = response.data.map(student => ({
    //                 id: student.id,
    //                 code: student.studentCode,
    //                 name: student.fullname,
    //                 gender: formatGender(student.gender),
    //                 class: student.className,
    //                 major: student.major,
    //                 department: student.faculty,
    //                 dob: formatDate(student.dob),
    //                 email: student.email,
    //                 phone: student.phone
    //             }));
    //             setStudents(formattedStudents);
    //             setFilteredStudents(formattedStudents);
    //         }
    //     } catch (err) {
    //         console.error('Error loading students:', err);
    //         setError('Không thể tải danh sách sinh viên. Vui lòng thử lại!');
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const formatGender = (gender) => {
        const genderMap = {
            'MALE': 'Nam',
            'FEMALE': 'Nữ',
        };
        return genderMap[gender] || gender;
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const handleSearch = (query) => {
        if (!query.trim()) {
            setFilteredStudents(students);
            return;
        }

        const searchQuery = query.toLowerCase();
        const filtered = students.filter(student => 
            student.code.toLowerCase().includes(searchQuery) ||
            student.name.toLowerCase().includes(searchQuery) ||
            student.email.toLowerCase().includes(searchQuery) ||
            student.class.toLowerCase().includes(searchQuery)
        );
        setFilteredStudents(filtered);
    };
    const handleEdit = () => {

    }

    const handleImport = () => {
        alert('Chức năng Import Excel');
    };

    const handleAdd = () => {
        alert('Thêm sinh viên mới');
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
                <Sidebar/>
                <div className="content">
                    <StudentSearchBar
                    onSearch={handleSearch}
                    onImport={handleImport}
                    onAdd={handleAdd}/>
                    {loading ? (
                        <div className="loading-container">
                            <div className="loading-spinner"></div>
                            <p>Đang tải danh sách sinh viên...</p>
                        </div>
                    ) : (
                        <StudentTable
                            students={filteredStudents}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}
export default StudentManagement;