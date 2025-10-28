import Header from '../../components/header/Header'
import './Style-ExamTicket.css'
import logo_success from '../../assets/logo_success.png'
import logo_university from '../../assets/logo_university.png'
import logo_reminder_ticket from '../../assets/logo_reminder_ticket.png'
import logo_schedule from '../../assets/logo_schedule.png'
import logo_download from '../../assets/logo_download.png'
import logo_print from '../../assets/logo_print.png'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import MyContext from '../../context/MyContext'

const ExamTicket = () => {

  const navigate = useNavigate()

  const {
    selectedSubject,
    selectedLocation, 
    setSelectedLocation,
    selectedExamSession,
    setSelectedExamSession
  } = useContext(MyContext)

  return (
    <div>
      <Header/>
      <div className='register-success'>
        <div className='frame-success'>
          <img src={logo_success} alt="" />
        </div>
        <p className='p1'>Đăng ký thành công</p>
        <p className='p2'>Phiếu báo dự thi của bạn</p>
        <div className='ticket'>
          <img src={logo_university} alt="" />
          <p className='p3'>Trường đại học Công Nghệ</p>
          <p className='p4'>Phiếu báo dự thi</p>
          <div className='ticket-info'>
            <div className='ticket-sub-info'>
              <label>Họ và tên:</label>
              <span>Nguyễn Văn A</span>
            </div>
            <div className='ticket-sub-info'>
              <label>Mã sinh viên:</label>
              <span>23021651</span>
            </div>
            <div className='ticket-sub-info'>
              <label>Học phần</label>
              <span>{selectedSubject.name}</span>
            </div>
            <div className='ticket-sub-info'>
              <label>Mã học phần:</label>
              <span>{selectedSubject.subject_code}</span>
            </div>
            <div className='ticket-sub-info'>
              <label>Ngày thi:</label>
              <span>{selectedExamSession.date}</span>
            </div>
            <div className='ticket-sub-info'>
              <label>Ca thi:</label>
              <span>{selectedExamSession.time}</span>
            </div>
            <div className='ticket-sub-info'>
              <label>Phòng thi:</label>
              <span>{selectedExamSession.room}</span>
            </div>
            <div className='ticket-sub-info'>
              <label>Địa điểm thi:</label>
              <span>{selectedLocation.name}</span>
            </div>
            <div className='ticket-sub-info'>
              <label>Thời lượng bài thi:</label>
              <span>60 phút</span>
            </div>
          </div>
          <div className='reminder-ticket'>
            <img src={logo_reminder_ticket} alt="" />
            <span>Lưu ý: Sinh viên mang theo phiếu này và thẻ sinh viên khi đi thi</span>
          </div>
        </div>
        <div className='options'>
          <div className='option option-schedule' onClick={() => navigate('/exam-schedule')}>
            <img src={logo_schedule} alt="" />
            <span>Lịch thi của tôi</span>
          </div>
          <div className='option option-download'>
            <img src={logo_download} alt="" />
            <span>Tải xuống</span>
          </div>
          <div className='option option-print'>
            <img src={logo_print} alt="" />
            <span>In phiếu</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExamTicket