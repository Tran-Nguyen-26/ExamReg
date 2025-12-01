import { useEffect, useState } from "react";
import Header from "../../../components/admin/header/Header";
import Sidebar from "../../../components/admin/sidebar/Sidebar";
import './Style-ExamEligibility.css'
import { examService } from "../../../services/examService";
import { ExamResponse } from "../../../models/Exam";
import { Subject } from "../../../models/Subject";
import { useSubjectStatus } from "../../../hooks/useSubjectStatus";
import { importLogService } from "../../../services/importLogService";


const ExamEligibility = () => {

  const {getStudentsCondition} = useSubjectStatus()

  const [exam, setExam] = useState(null);
  const [exams, setExams] = useState([])
  const [subject, setSubject] = useState(null);
  const [subjects, setSubjects] = useState([])
  const [students, setStudents] = useState([])
  const [file, setFile] = useState(null)


  useEffect(() => {
    const fetchData = async () => {
      try {
        const examData = await examService.getAll()
        const examResponses = examData.map(exam => ExamResponse.fromJSON(exam))
        setExams(examResponses)
        if (examResponses.length > 0) {
          setExam(examResponses[0])
        }
      } catch (error) {
        console.error("Load exam faild: ", error)
        throw error
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchSubjects = async () => {
      if (!exam) return 
      try {
        const subjectData = await examService.getSubjectsByExamId(exam.id)
        const subjectResponses = subjectData.map(sub => Subject.fromJSON(sub))
        setSubjects(subjectResponses)

        if (subjectResponses.length > 0) {
          setSubject(subjectResponses[0])
        } else {
          setSubject("")
        }
      } catch (error) {
        console.error("Load subjects failed: ", error);
        throw error
      }
    }
    fetchSubjects()
  }, [exam])


  const fetchStudents = async () => {
    if (!exam || !subject) return;
    try {
      const conditions = await getStudentsCondition(subject.id, exam.id);
      setStudents(conditions);
    } catch (error) {
      console.error("Load students failed: ", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [exam, subject]);

  const handleImportCondition = async () => {
    if (!file) {
      alert("Vui lòng chọn file trước")
      return 
    }
    try {
      await importLogService.importStudentsCondition(exam.id, subject.subjectCode, file)
      alert('Import thành công')
      fetchStudents()
    } catch (error) {
      console.error('Import failed: ', error);
    }
  }

  return (
    <div className="page">
      <Header />
      <div className="main">
        <Sidebar />
        <div className="content">
          <h1 className="page-title">Quản lý điều kiện dự thi</h1>

          <div className="card">
            <div className="form-row">
              <label className="label">Chọn kỳ thi</label>
              <select className="subject-select" value={exam?.id || ''} onChange={e => setExam(exams.find(ex => ex.id === Number(e.target.value)))}>
                {exams.map(e => (
                  <option key={e.id} value={e.id}>{e.examName}</option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <label className="label">Chọn môn học</label>
              <select className="subject-select" value={subject?.id || ''} onChange={e => setSubject(subjects.find(s => s.id === Number(e.target.value)))}>
                {subjects.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <label className="label">Chọn file Excel</label>
                <input 
                  type="file" 
                  accept=".xlsx,.xls" 
                  onChange={e => setFile(e.target.files[0])}
                />
            </div>

            <div className="actions-row" onClick={handleImportCondition}>
              <button className="btn btn-primary btn-lg d-flex align-items-center gap-2 custom-action">
                <i className="fas fa-download"></i>
                <span>Import Excel</span>
              </button>
            </div>

            <div className="table-wrap">
              <table className="student-table">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>MÃ SV</th>
                    <th>HỌ VÀ TÊN</th>
                    <th>TRẠNG THÁI</th>
                    <th>LÝ DO</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    students.map((s, idx) => (
                      <tr key={s.studentId}>
                        <td>{idx + 1}</td>
                        <td>{s.studentCode}</td>
                        <td>{s.fullname}</td>
                        <td>
                          <span className={`status ${s.status === 'ELIGIBLE' ? 'status-yes' : 'status-no'}`}>
                            {s.status === 'ELIGIBLE' ? 'Đủ điều kiện' : 'Không đủ điều kiện'}
                          </span>
                        </td>
                        <td>{s.reason || '-'}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default ExamEligibility;
