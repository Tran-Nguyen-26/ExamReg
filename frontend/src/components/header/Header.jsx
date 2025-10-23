import './Style-Header.css'
import logo_university from '../../assets/logo_university.png'
import logo_schedule from '../../assets/logo_schedule.png'
import { RxAvatar } from "react-icons/rx"


const Header = () => {
  return (
    <div className='screen d-flex justify-content-between align-items-center'>
      <div className='header-left d-flex flex-row'>
        <div className='hl1'>
          <img src={logo_university} alt="" className='logo_uni'/>
        </div>
        <div className='hl2'>
          <p className='exam-name'>UET Exam</p>
          <span className='student'>Trần Thành Nguyên - 23021651</span>
        </div>
      </div>

      <div className='header-right d-flex'>
        <div>
          <div className='schedule'>
            <img src={logo_schedule} alt="" className='logo_sche'/>
            <span>Lịch thi của tôi</span>
          </div>
        </div>
        <div>
          <RxAvatar/>
        </div>
      </div>
    </div>
  )
}

export default Header;