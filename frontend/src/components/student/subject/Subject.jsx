import './Style-Subject.css'
import logo_subject from '../../../assets/logo_subject.png'
import regis_btn from '../../../assets/register-btn.png'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import MyContext from '../../../context/MyContext'
import { IoMdCheckboxOutline } from "react-icons/io"


const Subject = ({data}) => {

  const navigate = useNavigate()

  const {setSelectedSubject} = useContext(MyContext)

  const handleSelectSubject = () => {
    setSelectedSubject(data)
    navigate(`/student/register/${data.id}`)
  }

  return (
    <div className='subject'>
      <div className='title'>
        <div>
          <img src={logo_subject} alt="" />
          <span className='subject-name'>{data.name}</span>
        </div>
        {
          data.sessionStatus === 'REGISTERED' ? (
            <div className='registered'>
              <span>Đã đăng kí</span>
              <IoMdCheckboxOutline/>
            </div>
          ) : data.sessionStatus === 'NOT_ELIGIBLE' ? (
            <div></div>
          ) : (
            <div className='register' onClick={handleSelectSubject}>
              <span>Đăng ký</span>
              <img src={regis_btn} alt="" />
            </div>
          )
        }
      </div>
      <div className='subject-info'>
        <div className='sub-info'>
          <span>Số tín chỉ:</span>
          <span>{data.creditHour}</span>
        </div>
        <div className='sub-info'>
          <span>Mã HP:</span>
          <span>{data.subjectCode}</span>
        </div>
        <div className='sub-info'>
          <span>Thời lượng thi:</span>
          <span>{`${data.duration} phút`}</span>
        </div>
        <div className='sub-info'>
          <span>Điều kiện thi:</span>
          <span>{data.status === 'ELIGIBLE' ? 'Đủ điều kiện' : 'Không đủ điều kiện'}</span>
        </div>
      </div>
    </div>
  )
}

export default Subject;