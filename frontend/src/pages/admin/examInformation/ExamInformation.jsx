import { useState, useEffect } from "react"
import Header from "../../../components/admin/header/Header"
import Sidebar from "../../../components/admin/sidebar/Sidebar"
import { IoMdAdd } from "react-icons/io";
import { FiArrowLeft } from "react-icons/fi";
import SubjectTableExam from "../../../components/admin/subjectTableExam/SubjectTableExam";
import {useParams,  useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { examService } from "../../../services/examService";
import { examSessionService } from '../../../services/examSessionService';
import './Style-ExamInformation.css'

const ExamInformation = () => {
    const handleAddSubject = (exam) => {
        alert(`Thêm môn thi cho: ${exam.name}`);
    };
    const navigate = useNavigate();
    const { examId } = useParams();
    
    const [subjects, setSubjects] = useState([]);
    const [filteredSubjects, setFilteredSubjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [availableSubjects, setAvailableSubjects] = useState([]);

    useEffect(() => {
        loadSubjects();
    }, [examId]);

    const loadSubjects = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await examService.getSubjectsOfExam(examId);
            
            // Format data for table
            const formattedSubjects = await Promise.all(
            response.map(async (subject) => {
                const examSessions = await examSessionService.getExamSessionsBySubjectId(subject.id, examId);

                return {
                id: subject.id,
                subjectCode: subject.subjectCode,
                name: subject.name,
                sessions: examSessions.length,
                creditHour: subject.creditHour,
                duration: subject.duration
                };
            })
            );
            
            setSubjects(formattedSubjects);
            setFilteredSubjects(formattedSubjects);
        } catch (err) {
            console.error('Error loading subjects:', err);
            setError('Không thể tải danh sách môn thi. Vui lòng thử lại!');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        
        if (!query.trim()) {
            setFilteredSubjects(subjects);
            return;
        }

        const searchLower = query.toLowerCase();
        const filtered = subjects.filter(subject =>
            subject.subjectCode.toLowerCase().includes(searchLower) ||
            subject.name.toLowerCase().includes(searchLower)
        );
        
        setFilteredSubjects(filtered);
    };

    const handleDeleteSubject = async (subject) => {
        if (confirm(`Bạn có chắc muốn xóa môn thi này ? "${subject.name}"? Hành động này không thể hoàn tác!`)) {
            try {
                await examService.deleteSubject(examId, subject.id);
                await loadSubjects();
            } catch (error) {
                console.error('Error deleting subject:', error);
                alert('Lỗi khi xóa môn thi!');
            }
        }
    }

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
                            onChange={(e) => handleSearch(e.target.value)}
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
                    subjects={filteredSubjects}
                    onDelete={handleDeleteSubject}/>
                </div>
            </div>
        </div>
    )
}
export default ExamInformation;

