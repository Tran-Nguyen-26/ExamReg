import { useNavigate, useParams } from "react-router-dom";
import Header from "../../../components/admin/header/Header";
import Sidebar from "../../../components/admin/sidebar/Sidebar";
import { FiArrowLeft } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import SessionTable from "../../../components/admin/sessionTable/SessionTable";
import { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import AddExamSessionModal from "../../../components/admin/addExamSessionModal/AddExamSessionModal";
import { examSessionService } from "../../../services/examSessionService";
import { courseService } from "../../../services/courseService";
import './Style-SubjectSessions.css';

const SubjectSessions = () => {
    const navigate = useNavigate();
    const [isAddExamSessionModal, setIsAddExamSessionModal] = useState(false);
    const { examId, subjectId } = useParams();

    const [sessions, setSessions] = useState([]);
    const [subjectInfo, setSubjectInfo] = useState(null);

    useEffect(() => {
        loadSubjectInfo();
        loadExamSessions();
    }, [examId, subjectId]);

    const loadSubjectInfo = async () => {
        try {
            const subject = await courseService.getSubjectById(subjectId);
            setSubjectInfo({
                subjectCode: subject.subjectCode,
                subjectName: subject.name,
                subjectId: subjectId,
                examId: examId
            });
        } catch (err) {
            console.error('Error loading subject info:', err);
        }
    };

    const loadExamSessions = async (sessionData) => {
        try {
            const examSessions = await examSessionService.getExamSessionsBySubjectId(subjectId, examId);
            
            // Format data for table
            const formattedSessions = examSessions.map(session => ({
                id: session.id,
                subject: session.subjectName,
                date: formatDate(session.date),
                time: formatTime(session.startTime),
                room: session.roomName,
                location: session.locationName,
                locationId: session.locationId,
                roomId: session.roomId,
                capacity: session.capacity,
                registered: session.registeredCount,
                isFull: session.registeredCount >= session.capacity
            }));
            
            setSessions(formattedSessions);
            console.log("raw response item:", (await examSessionService.getExamSessionsBySubjectId(subjectId, examId))[0]);
        } catch (err) {
            console.error('Error loading exam sessions:', err);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    };

    const formatTime = (timeString) => {
        if (!timeString) return '';
        // "08:30:00" -> "08:30"
        return timeString.slice(0, 5);
    };

     const handleSaveSession = async () => {
        // This will be called from modal after successful creation
        await loadExamSessions();
    };

    return (
        <>
        <Header/>
        <div className="main">
            <Sidebar/>
            <div className="content">
                <div className="sessions-header">
                    <div className="sessions-header-left">
                        <div onClick={() => navigate(`/admin/exam-management/exam-info/${examId}`)}>
                            <FiArrowLeft/>
                        </div>
                        <h1 className="subject-title">{subjectInfo?.subjectCode} - {subjectInfo?.subjectName}</h1>
                    </div>
                    <button className="btn-add-session" onClick={() => setIsAddExamSessionModal(true)}>
                        <IoMdAdd className="icon-add-session"/>
                        <span>Tạo ca thi mới</span>
                    </button>
                </div>
                <SessionTable
                sessions={sessions}
                onSave={handleSaveSession}
                />
            </div>
            {isAddExamSessionModal && (
                <AddExamSessionModal
                onClose={() => setIsAddExamSessionModal(false)}
                subjectInfo={subjectInfo}
                onSave={handleSaveSession}
                />
            )}
        </div>
        </>
    )
}
export default SubjectSessions;