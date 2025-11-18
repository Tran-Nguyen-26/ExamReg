import { useState } from "react";
import Header from "../../../components/admin/header/Header";
import Sidebar from "../../../components/admin/sidebar/Sidebar";
import CourseSearchbar from "../../../components/admin/searchbar/CourseSearchbar";
import SubjectTable from "../../../components/admin/subjectTable/SubjectTable";
import './Style-CourseManagement.css'
import { IoMdAdd } from "react-icons/io";
import CreateCourseModal from "../../../components/admin/createCourseModal/CreateCourseModal";

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
            duration: '90 phút',
            status: 'Active'
        },
        {
            id: 2,
            code: 'CS102',
            name: 'Cấu trúc dữ liệu',
            credits: 4,
            semester: 2,
            duration: '120 phút',
            status: 'Active'
        }
    ]);

    const [isCreateCourseModal, setIsCreateCourseModal] = useState(false);
    const [subjectsState, setSubjectsState] = useState(subjects);

    const handleAdd = () => {
        setIsCreateCourseModal(true);
    };

    const closeCreateCourseModal = () => {
        setIsCreateCourseModal(false);
    };

    const handleSubmitCourse = (course) => {
        const newCourse = {
            id: subjectsState.length + 1,
            code: course.code,
            name: course.name,
            credits: course.credits,
            semester: course.semester,
            duration: course.duration,
            status: course.status || 'Active'
        };
        setSubjectsState([...subjectsState, newCourse]);
        alert('Thêm môn học thành công!');
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
                    <div className="course-management-header">
                        <CourseSearchbar onSearch={handleSearch} onAdd={handleAdd} />
                    </div>
                    <SubjectTable
                        subjects={subjectsState}
                        onView={handleView}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        showView={false}
                        instructorLabel="Thời lượng thi"
                        instructorKey="duration"
                    />
                    {isCreateCourseModal && (
                        <CreateCourseModal onClose={closeCreateCourseModal} onSubmit={handleSubmitCourse} />
                    )}
                </div>
            </div>
        </div>
    )
}
export default CourseManagement;

