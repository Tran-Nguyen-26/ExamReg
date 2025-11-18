import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import './Style-SubjectTableExam.css';
import { useNavigate } from 'react-router-dom';

const SubjectTableExam = ({subjects, onDelete}) => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    
    const totalPages = Math.ceil(subjects.length / itemsPerPage); //làm tròn lên
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentSubjects = subjects.slice(startIndex, endIndex); //slice() lấy một phần con của mảng subjects từ startIndex đến endIndex (không tính endIndex)
    
    // Xử lý chuyển trang
    const goToPage = (page) => {
        setCurrentPage(page); //khi currentPage thay đổi, render lại trang mới
    };
    
    const goToPrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1); //lùi trang áp dụng từ trang 2
        }
    };
    
    const goToNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1); //sang trang trừ trang cuối
        }
    };
    
    return (
        <>
            <div className='subject-table-container'>
                <div className='subject-table-wrapper'>
                    <table className='subject-table'>
                        <thead>
                            <tr className='subject-table-header-row'>
                                <th className='subject-table-header'>STT</th>
                                <th className="subject-table-header">Mã môn thi</th>
                                <th className="subject-table-header subject-table-name">Tên môn thi</th>
                                <th className='subject-table-header'>Số ca thi</th>
                                <th className='subject-table-header'>Số tín chỉ</th>
                                <th className='subject-table-header'>Thời lượng thi</th>
                                <th className='subject-table-header'>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentSubjects.map((subject, index) => (
                                <tr key={subject.id} className='subject-table-row'>
                                    <td className='subject-table-cell'>
                                        {startIndex + index + 1}
                                    </td>
                                    <td className='subject-table-cell subject-code'>
                                        {subject.code}
                                    </td>
                                    <td className='subject-table-cell subject-table-name'>{subject.name}</td>
                                    <td className='subject-table-cell subject-sessions' onClick={()=>navigate("/admin/exam-management/exam-info/sessions/")}>{subject.sessions}</td>
                                    <td className='subject-table-cell'>
                                        {subject.creditHour}
                                    </td>
                                    <td className='subject-table-cell'>
                                        {subject.duration}
                                    </td>
                                    <td className='subject-table-cell subject-action'>
                                        Xóa
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                {/* Pagination */}
                {totalPages > 1 && ( //từ 2 trang trở lại mới phân trang
                    <div className='exam-information-pagination'>
                        <div className='exam-information-pagination-info'>
                            Hiển thị {startIndex + 1} - {Math.min(endIndex, subjects.length)} của {subjects.length} môn thi 
                        </div>
                        <div className='exam-information-pagination-controls'>
                            <button
                                onClick={goToPrevious}
                                disabled={currentPage === 1}
                                className='exam-information-pagination-btn'
                                title="Trang trước"
                            >
                                <FaChevronLeft />
                            </button>
                            
                            {[...Array(totalPages)].map((_, i) => {
                                const page = i + 1;
                                // Hiển thị trang đầu, cuối và các trang xung quanh trang hiện tại
                                if (
                                    page === 1 ||
                                    page === totalPages ||
                                    (page >= currentPage - 2 && page <= currentPage + 2)
                                ) {
                                    return (
                                        <button
                                            key={page}
                                            onClick={() => goToPage(page)}
                                            className={`exam-information-pagination-number ${
                                                currentPage === page ? 'active' : ''
                                            }`}
                                        >
                                            {page}
                                        </button>
                                    );
                                } else if (
                                    page === currentPage - 2 ||
                                    page === currentPage + 2
                                ) {
                                    return <span key={page} className='exam-information-pagination-dots'>...</span>;
                                }
                                return null;
                            })}
                            
                            <button
                                onClick={goToNext}
                                disabled={currentPage === totalPages}
                                className='exam-information-pagination-btn'
                                title="Trang sau"
                            >
                                <FaChevronRight />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default SubjectTableExam;