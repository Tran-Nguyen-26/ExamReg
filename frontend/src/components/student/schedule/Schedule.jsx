import './Style-Schedule.css'
import icon_book from '../../../assets/icon_book.png'
import icon_schedule from '../../../assets/icon_schedule.png'
import icon_clock from '../../../assets/icon_clock.png'
import icon_location from '../../../assets/icon_location.png'
import logo_download from '../../../assets/logo_download.png'
import logo_print from '../../../assets/logo_print.png'
import logo_remove from '../../../assets/logo_remove.png'

const Schedule = ({ data, onCancel }) => {
  return (
    <div className='exam-session-schedule'>
      <div className='subject-header'>
        <img src={icon_book} alt="" />
        <div>
          <label>{data.examSession.subjectStatus.subject.name}</label>
          <span>{`Mã HP: ${data.examSession.subjectStatus.subject.subjectCode}`}</span>
        </div>
      </div>
      <div className='subject-body'>
        <div className='info date'>
          <img src={icon_schedule} alt="" />
          <div>
            <label>Ngày thi</label>
            <span>{data.examSession.date}</span>
          </div>
        </div>
        <div className='info time'>
          <img src={icon_clock} alt="" />
          <div>
            <label>Giờ thi</label>
            <span>{data.examSession.startTime}</span>
          </div>
        </div>
        <div className='info loc'>
          <img src={icon_location} alt="" />
          <div>
            <label>Đia điểm thi</label>
            <span>{`${data.examSession.room.name} - ${data.examSession.room.location.name}`}</span>
          </div>
        </div>
      </div>
      <div className='action-buttons'>
        <div className='action-button button-download'>
          <img src={logo_download} alt="" />
          <span>Tải phiếu</span>
        </div>
        <div className='action-button button-print'>
          <img src={logo_print} alt="" />
          <span>In phiếu</span>
        </div>
        <div className='action-button button-remove' onClick={() => {
          const confirmCancel = window.confirm("Xác nhận hủy đăng kí ca thi này")
          if (confirmCancel) {
            onCancel(data.id)
          }
        }}>
          <img src={logo_remove} alt="" />
          <span>Hủy đăng ký</span>
        </div>
      </div>
    </div>
  )
}

export default Schedule