import './Style-Header.css'
import logo_university from '../../assets/logo_university.png'
import logo_schedule from '../../assets/logo_schedule.png'
import { useLocation, useNavigate } from 'react-router-dom'
import logo_home from '../../assets/logo_home.png'
import { MdAccountCircle } from "react-icons/md"
import { HiHome } from "react-icons/hi2"
import { useContext } from 'react'
import MyContext from '../../context/MyContext'

const Header = () => {

  const { user } = useContext(MyContext)

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
          <span className='student'>{`${user.fullname} - ${user.studentCode}`}</span>
        </div>
      </div>

      <div className='header-right d-flex'>
        {
          showExamSchedule ? (
            <div className='home' onClick={() => navigate('/home')}>
              <HiHome/>
              <span>Trang chủ</span>
            </div>
          ) : (
            <div className='schedule' onClick={() => navigate('/exam-schedule')}>
              <img src={logo_schedule} alt="" className='logo_sche'/>
              <span>Lịch thi của tôi</span>
            </div>
          )
        }
        <MdAccountCircle onClick={() => navigate('/student-account')}/>
      </div>
    </div>
  )
}

export default Header;