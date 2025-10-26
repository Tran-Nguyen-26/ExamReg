import './Style-SelectedSubject.css'
import logo_subject from '../../assets/logo_subject.png'
import logo_change from '../../assets/logo_change.png'
import { useNavigate } from 'react-router-dom'

const SelectedExam = () => {

  const navigate = useNavigate()
  
  return (
    <div className='selected-exam'>
      <div>
        <img src={logo_subject} alt="" />
        <span>Môn thi</span>
      </div>
      <h4>Cơ sở dữ liệu</h4>
      <p>Kiểm tra cuối kì học kì I năm học 2025-2026</p>
      <p>Thời lượng bài thi: 60 phút</p>
      <div className='change-subject' onClick={() => navigate('/home')}>
        <img src={logo_change} alt="" />
        <span>Thay đổi môn thi</span>
      </div>
    </div>
  )
}

export default SelectedExam;