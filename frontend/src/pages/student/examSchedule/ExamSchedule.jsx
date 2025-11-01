import Header from "../../../components/student/header/Header"
import Schedule from "../../../components/student/schedule/Schedule"
import './Style-ExamSchedule.css'

const ExamSchedule = () => {
  return (
    <div className="exam-schedule">
      <Header/>
      <div className="schedule-header">
        <div className="part1">
          <h2>Lịch thi của tôi</h2>
          <p>Danh sách các ca thi bạn đã đăng ký</p>
        </div>
        <div className="part2">
          <h1>6</h1>
          <p>Môn thi</p>
        </div>
      </div>
      <div className="main-card">
        <Schedule/>
        <Schedule/>
        <Schedule/>
        <Schedule/>
        <Schedule/>
        <Schedule/>
      </div>
    </div>
  )
}

export default ExamSchedule