import './Style_AddExamSubjects.css';
import {useState} from 'react';
import { IoIosClose } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { IoAddOutline } from "react-icons/io5";
import { TiTickOutline } from "react-icons/ti";
import { useExam } from '../../../hooks/useExam';

const AddExamSubjectsModal = ({onClose, availableSubjects, exam}) => {

    const { addSubjectsToExam } = useExam()

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const filteredSubjects = availableSubjects.filter(subject =>
        subject.subjectCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subject.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleCheckboxChange = (subjectId) => {
        setSelectedSubjects(prev => {
        if (prev.includes(subjectId)) {
            return prev.filter(id => id !== subjectId);
        } else {
            return [...prev, subjectId];
        }
        });
    };

    // Handle select all
    const handleSelectAll = () => {
        if (selectedSubjects.length === filteredSubjects.length) {
            setSelectedSubjects([]);
        } else {
            setSelectedSubjects(filteredSubjects.map(s => s.id));
        }
    };

    // Handle add single subject
    const handleAddSingle = (subjectId) => {
        try {
            addSubjectsToExam(exam.id, [subjectId])
        } catch (error) {
            console.log("Add subject failed ", error)
            throw error
        }
    };

    // Handle add multiple subjects
    const handleAddSelected = () => {
        if (selectedSubjects.length === 0) {
        alert('Vui lòng chọn ít nhất một môn học!');
        return;
        }

        setLoading(true);
        
        const subjectIdsToAdd = availableSubjects
            .filter(s => selectedSubjects.includes(s.id))
            .map(s => s.id)
        
        setTimeout(() => {
            setLoading(false);
            addSubjectsToExam(exam.id, subjectIdsToAdd);
            onClose();
        }, 500);
    };

    const isAllSelected = filteredSubjects.length > 0 && 
                    selectedSubjects.length === filteredSubjects.length;

    return (
        <div className='add-subject-modal-overlay' onClick={onClose}>
            <div className='add-subject-modal-main' onClick={(e) => e.stopPropagation()}>
                <div className='add-subject-modal-header'>
                    <h2 className='add-subject-modal-title'>Thêm môn thi</h2>
                    <button className='add-subject-modal-close-btn' onClick={onClose}>
                         <IoIosClose className='add-subject-modal-close-icon'/>
                    </button>
                </div>
                <div className='add-subject-search-section'>
                    <div className='add-subject-search-input-wrapper'>
                        <CiSearch className='add-subject-search-icon'/>
                    </div>
                    <input
                    type="text"
                    className="add-subject-search-input"
                    placeholder="Tìm kiếm theo tên, mã học phần..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className='add-subject-modal-body'>
                    <div className='add-subject-table-container'>
                        <table className='add-subject-table'>
                            <thead>
                                <tr>
                                    <th className="add-subject-checkbox-col">
                                    <input
                                        type="checkbox"
                                        className="add-subject-checkbox-input"
                                        checked={isAllSelected}
                                        onChange={handleSelectAll}
                                        />
                                    </th>
                                    <th>STT</th>
                                    <th>Mã môn</th>
                                    <th>Tên môn học</th>
                                    <th>Số tín chỉ</th>
                                    <th>Thời lượng thi</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredSubjects.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="add-subject-table-empty-state">
                                    <div className="add-subject-table-empty-icon">🔍</div>
                                    <p>Không tìm thấy môn học nào</p>
                                    </td>
                                </tr>
                                ) : (
                                filteredSubjects.map((subject, index) => (
                                    <tr key={subject.id} className={selectedSubjects.includes(subject.id) ? 'selected-row' : ''}>
                                    <td className="add-subject-checkbox-col">
                                        <input
                                        type="checkbox"
                                        className="add-subject-checkbox-input"
                                        checked={selectedSubjects.includes(subject.id)}
                                        onChange={() => handleCheckboxChange(subject.id)}
                                        />
                                    </td>
                                    <td>{index + 1}</td>
                                    <td><strong>{subject.subjectCode}</strong></td>
                                    <td>{subject.name}</td>
                                    <td>{subject.creditHour}</td>
                                    <td>{subject.duration} phút</td>
                                    <td>
                                        <button
                                        className="add-subject-btn-add-single"
                                        onClick={() => handleAddSingle(subject.id)}
                                        title="Thêm môn này"
                                        >
                                        <IoAddOutline className='add-subject-icon-add-single'/>
                                        Thêm
                                        </button>
                                    </td>
                                    </tr>
                                ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="add-subject-modal-footer">
                    <button onClick={onClose} className="btn-cancel" disabled={loading}>
                        Hủy
                    </button>
                    <button 
                        onClick={handleAddSelected} 
                        className="btn-add-subject-selected" 
                        disabled={loading || selectedSubjects.length === 0}
                    >
                        {loading ? (
                        <>
                            <span className="spinner"></span>
                            Đang thêm...
                        </>
                        ) : (
                        <>
                            Thêm đã chọn ({selectedSubjects.length})
                        </>
                        )}
                    </button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default AddExamSubjectsModal;
