import Header from "../../components/header/Header"
import Schedule from "../../components/schedule/Schedule"
import './Style-ExamSchedule.css'

//fake data
import examRegistrationData from '../../data/ExamRegistrationData.json'

const ExamSchedule = () => {


  //fake data
  const examSchedules = examRegistrationData

  return (
    <div className="exam-schedule">
      <Header/>
      <div className="schedule-header">
        <div className="part1">
          <h2>Lịch thi của tôi</h2>
          <p>Danh sách các ca thi bạn đã đăng ký</p>
        </div>
        <div className="part2">
          <h1>{examSchedules.length}</h1>
          <p>Môn thi</p>
        </div>
      </div>
      <div className="main-card">
        {
          examSchedules.map((examSchedule) => (
            <Schedule
              key={examSchedule.id}
              data={examSchedule}
            />
          ))
        }
      </div>
    </div>
  )
}

export default ExamSchedule