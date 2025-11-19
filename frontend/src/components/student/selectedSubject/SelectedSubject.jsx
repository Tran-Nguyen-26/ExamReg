import './Style-SelectedSubject.css'
import logo_subject from '../../../assets/logo_subject.png'
import { useNavigate } from 'react-router-dom'
import { MdOutlineChangeCircle } from "react-icons/md"

const SelectedSubject = ({subject}) => {

  const navigate = useNavigate()
  
  return (
    <div className='selected-exam'>
      <div>
        <img src={logo_subject} alt="" />
        <span>Môn thi</span>
      </div>
      <h4>{subject.name}</h4>
      <p>Kiểm tra cuối kì học kì I năm học 2025-2026</p>
      <p>{`Thời lượng bài thi: ${subject.duration} phút`}</p>
      <div className='change-subject' onClick={() => navigate('/student/home')}>
        <MdOutlineChangeCircle/>
        <span>Thay đổi môn thi</span>
      </div>
    </div>
  )
}

export default SelectedSubject;