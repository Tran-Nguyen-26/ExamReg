import Header from '../../components/header/Header'
import './Style-ExamTicket.css'
import logo_success from '../../assets/logo_success.png'
import logo_university from '../../assets/logo_university.png'
import logo_reminder_ticket from '../../assets/logo_reminder_ticket.png'
import logo_schedule from '../../assets/logo_schedule.png'
import logo_download from '../../assets/logo_download.png'
import logo_print from '../../assets/logo_print.png'

const ExamTicket = () => {
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
              <span>Cơ sở dữ liệu</span>
            </div>
            <div className='ticket-sub-info'>
              <label>Mã học phần:</label>
              <span>PHI1001</span>
            </div>
            <div className='ticket-sub-info'>
              <label>Ngày thi:</label>
              <span>01/01/2025</span>
            </div>
            <div className='ticket-sub-info'>
              <label>Ca thi:</label>
              <span>Ca 1 - 7:00</span>
            </div>
            <div className='ticket-sub-info'>
              <label>Phòng thi:</label>
              <span>101</span>
            </div>
            <div className='ticket-sub-info'>
              <label>Địa điểm thi:</label>
              <span>Giảng đường 1</span>
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
          <div className='option option-schedule'>
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