import './Style-Header.css'
import logo_university from '../../assets/logo_university.png'
import logo_schedule from '../../assets/logo_schedule.png'
import logo_avatar from '../../assets/logo_avatar.png'
import { useLocation, useNavigate } from 'react-router-dom'
import logo_home from '../../assets/logo_home.png'

const Header = () => {

  const navigate = useNavigate()
  const location = useLocation()

  const showExamSchedule = location.pathname === '/exam-schedule'

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
        {
          showExamSchedule ? (
            <div className='schedule' onClick={() => navigate('/home')}>
              <img src={logo_home} alt="" />
              <span className='text-dark'>Trang chủ</span>
            </div>
          ) : (
            <div className='schedule' onClick={() => navigate('/exam-schedule')}>
              <img src={logo_schedule} alt="" className='logo_sche'/>
              <span>Lịch thi của tôi</span>
            </div>
          )
        }
        <img src={logo_avatar} alt="" onClick={() => navigate('/student-account')}/>
      </div>
    </div>
  )
}

export default Header;