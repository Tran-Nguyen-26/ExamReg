import './Style-Schedule.css'
import icon_book from '../../assets/icon_book.png'
import icon_schedule from '../../assets/icon_schedule.png'
import icon_clock from '../../assets/icon_clock.png'
import icon_location from '../../assets/icon_location.png'
import logo_download from '../../assets/logo_download.png'
import logo_print from '../../assets/logo_print.png'
import logo_remove from '../../assets/logo_remove.png'

const Schedule = ({data}) => {
  return (
    <div className='exam-session-schedule'>
      <div className='subject-header'>
        <img src={icon_book} alt="" />
        <div>
          <label>{data.subject_name}</label>
          <span>{`Mã HP: ${data.subject_code}`}</span>
        </div>
      </div>
      <div className='subject-body'>
        <div className='info date'>
          <img src={icon_schedule} alt="" />
          <div>
            <label>Ngày thi</label>
            <span>{data.date}</span>
          </div>
        </div>
        <div className='info time'>
          <img src={icon_clock} alt="" />
          <div>
            <label>Giờ thi</label>
            <span>{data.time}</span>
          </div>
        </div>
        <div className='info loc'>
          <img src={icon_location} alt="" />
          <div>
            <label>Đia điểm thi</label>
            <span>{`P${data.room} - ${data.address}`}</span>
          </div>
        </div>
      </div>
      <div className='action-buttons'>
        <div className='action-btn btn-download'>
          <img src={logo_download} alt="" />
          <span>Tải phiếu</span>
        </div>
        <div className='action-btn btn-print'>
          <img src={logo_print} alt="" />
          <span>In phiếu</span>
        </div>
        <div className='action-btn btn-remove'>
          <img src={logo_remove} alt="" />
          <span>Hủy đăng ký</span>
        </div>
      </div>
    </div>
  )
}

export default Schedule