import { forwardRef, useContext, useImperativeHandle } from 'react'
import './Style-Ticket.css'
import MyContext from '../../../context/MyContext'
import logo_university from '../../../assets/logo_university_no_bg.png'
import logo_reminder_ticket from '../../../assets/logo_reminder_ticket.png'
import logo_schedule from '../../../assets/logo_schedule.png'
import logo_download from '../../../assets/logo_download.png'
import logo_print from '../../../assets/logo_print.png'
import { useNavigate } from 'react-router-dom'
import html2pdf from 'html2pdf.js'
import printJS from 'print-js'

const Ticket = forwardRef((props, ref) => {

  const navigate = useNavigate()

  const {
    user,
    selectedSubject,
    selectedLocation, 
    setSelectedLocation,
    selectedExamSession,
    setSelectedExamSession
  } = useContext(MyContext)

  const handleDownload = () => {
    const element = document.getElementById('ticket')
    const subject_name = selectedSubject.name.split(" ").join("-")
    const file_name = `phiếu-dự-thi-môn-${subject_name}.pdf`
    html2pdf().from(element).save(file_name)
  }

  const handlePrint = () => {
    printJS({
      printable: 'ticket',
      type: 'html',
      scanStyles: true,
      style: '',
    })
  }

  useImperativeHandle(ref, () => ({
    download: handleDownload,
    print: handlePrint
  }))

  return (
    <div className='dialog-ticket'>
      <div id='ticket' className='ticket'>
        <img src={logo_university} alt="" />
        <p className='p3'>Trường đại học Công Nghệ</p>
        <p className='p4'>Phiếu báo dự thi</p>
        <div className='ticket-info'>
          <div className='ticket-sub-info'>
            <label>Họ và tên:</label>
            <span>{user.fullname}</span>
          </div>
          <div className='ticket-sub-info'>
            <label>Mã sinh viên:</label>
            <span>{user.studentCode}</span>
          </div>
          <div className='ticket-sub-info'>
            <label>Học phần</label>
            <span>{selectedSubject.name}</span>
          </div>
          <div className='ticket-sub-info'>
            <label>Mã học phần:</label>
            <span>{selectedSubject.subjectCode}</span>
          </div>
          <div className='ticket-sub-info'>
            <label>Ngày thi:</label>
            <span>{selectedExamSession.date}</span>
          </div>
          <div className='ticket-sub-info'>
            <label>Giờ thi:</label>
            <span>{selectedExamSession.startTime}</span>
          </div>
          <div className='ticket-sub-info'>
            <label>Phòng thi:</label>
            <span>{selectedExamSession.room.name}</span>
          </div>
          <div className='ticket-sub-info'>
            <label>Địa điểm thi:</label>
            <span>{selectedLocation.name}</span>
          </div>
          <div className='ticket-sub-info'>
            <label>Thời lượng bài thi:</label>
            <span>{`${selectedSubject.duration} phút`}</span>
          </div>
        </div>
        <div className='reminder-ticket'>
          <img src={logo_reminder_ticket} alt="" />
          <span>Lưu ý: Sinh viên mang theo phiếu này và thẻ sinh viên khi đi thi</span>
        </div>
      </div>
      <div className='options'>
        <div className='option option-schedule' onClick={() => navigate('/student/exam-schedule')}>
          <img src={logo_schedule} alt="" />
          <span>Lịch thi của tôi</span>
        </div>
        <div className='option option-download' onClick={handleDownload}>
          <img src={logo_download} alt="" />
          <span>Tải xuống</span>
        </div>
        <div className='option option-print' onClick={handlePrint}>
          <img src={logo_print} alt="" />
          <span>In phiếu</span>
        </div>
      </div>
    </div>
  )
})

export default Ticket